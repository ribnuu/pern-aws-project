const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const generateTreeViewForAllPagesByGroupOrRoleIdQuery = async ({
  groupId = null,
  roleId = null,
}) => {
  try {
    const {
      CccMasterButtons,
      CccMasterPages,
      CccRightsGroupButtons,
      CccRightsRolesButtons,
    } = setUpAssociationsCCC();

    // Helper function to fetch a page with its associated buttons recursively
    const getPageWithButtons = async (pagesId) => {
      // Fetch the page by id
      const page = await CccMasterPages.findOne({
        where: { pages_id: pagesId },
      });

      if (!page) return null;

      const includeArray = [];

      if (groupId) {
        includeArray.push({
          model: CccRightsGroupButtons,
          as: "rightsGroupMasterButtons",
          where: {
            user_group_id: groupId,
          },
          required: false, // Do not exclude pages without buttons
        });
      }

      if (roleId) {
        includeArray.push({
          model: CccRightsRolesButtons,
          as: "rightsRoleMasterButtons",
          where: {
            user_role_id: roleId,
          },
          required: false, // Do not exclude pages without buttons
        });
      }

      // Fetch the buttons for this page
      const buttons = await CccMasterButtons.findAll({
        where: { component_pages_id: pagesId },
        include: [...includeArray],
      });

      // Recursively fetch nested buttons
      const buttonsWithNestedComponents = await Promise.all(
        buttons.map(async (button) => {
          const nestedComponents = await getButtonWithNestedComponents(
            button.ccc_master_buttons_id
          );

          const rightsMasterButtons = groupId
            ? button.rightsGroupMasterButtons
            : roleId
              ? button.rightsRoleMasterButtons
              : [];

          return {
            children: nestedComponents,
            checked: rightsMasterButtons?.length > 0, // Child's check state
            element: "BTN",
            id: button.ccc_master_buttons_id,
            label: button.button_display_name,
          };
        })
      );

      return {
        children: buttonsWithNestedComponents,
        checked: false, // Always false for parent
        element: "COM",
        id: page.pages_id,
        label: page.component_name,
      };
    };

    // Helper function to fetch a button and its nested components recursively
    const getButtonWithNestedComponents = async (buttonId) => {
      const includeArrayX = [];

      if (groupId) {
        includeArrayX.push({
          model: CccRightsGroupButtons,
          as: "rightsGroupMasterButtons",
          where: {
            user_group_id: groupId,
          },
          required: false, // Do not exclude pages without buttons
        });
      }

      if (roleId) {
        includeArrayX.push({
          model: CccRightsRolesButtons,
          as: "rightsRoleMasterButtons",
          where: {
            user_role_id: roleId,
          },
          required: false, // Do not exclude pages without buttons
        });
      }

      // Find buttons where the component_pages_id refers to the current button id (button nesting)
      const nestedButtons = await CccMasterButtons.findAll({
        where: { component_pages_id: buttonId },
        include: [...includeArrayX],
      });

      // Recursively fetch further nested buttons
      const nestedComponents = await Promise.all(
        nestedButtons.map(async (nestedButton) => {
          const furtherNested = await getButtonWithNestedComponents(
            nestedButton.ccc_master_buttons_id
          );

          const rightsMasterButtons = groupId
            ? nestedButton.rightsGroupMasterButtons
            : roleId
              ? nestedButton.rightsRoleMasterButtons
              : [];

          return {
            children: furtherNested,
            // For the tree view in FE, the check state is based on rightsMasterButtons
            checked: rightsMasterButtons?.length > 0, // Check child button state
            element: "BTN",
            id: nestedButton.ccc_master_buttons_id,
            label: nestedButton.button_display_name,
          };
        })
      );

      return nestedComponents;
    };

    // Fetch all master pages
    const allPages = await CccMasterPages.findAll({
      // where: {
      //   pages_id: "1004000000000012",
      // },
    });

    // Iterate over all pages and build the tree structure
    const treeView = await Promise.all(
      allPages.map(async (page) => {
        return await getPageWithButtons(page.pages_id);
      })
    );

    return treeView;
  } catch (error) {
    throw error;
  }
};

const updateTreeViewDataForGroupQuery = async ({ groupId, data }) => {
  try {
    const { CccRightsGroupButtons, CccMasterButtons } = setUpAssociationsCCC();

    // Helper to recursively get nested component IDs
    const getAllNestedComponentIds = async (
      componentPagesIds,
      collectedIds = new Set()
    ) => {
      const subButtons = await CccMasterButtons.findAll({
        where: {
          component_pages_id: componentPagesIds,
        },
        attributes: ["component_pages_id", "ccc_master_buttons_id"],
      });

      const nestedIds = subButtons.map(
        (record) => record.ccc_master_buttons_id
      );

      // Add to collected IDs
      nestedIds.forEach((id) => collectedIds.add(id));

      if (nestedIds.length > 0) {
        await Promise.all(
          nestedIds.map(async (id) => {
            await getAllNestedComponentIds([id], collectedIds);
          })
        );
      }

      return collectedIds;
    };

    // Helper function to extract button IDs recursively
    const extractButtonIds = (items, buttonIds = new Set()) => {
      items.forEach((item) => {
        const id = item?._id ? item._id : item;
        buttonIds.add(id);

        if (item._children && item._children.length > 0) {
          extractButtonIds(item._children, buttonIds);
        }
      });
      return buttonIds;
    };

    // Step 1: Extract all button ids (including nested ones) from the data
    const buttonIdsFromData = extractButtonIds(data);

    // Step 2: Get all nested component IDs and combine them with extracted button IDs
    const nestedComponentIds = await getAllNestedComponentIds([
      ...buttonIdsFromData,
    ]);

    // Combine both sets and return unique IDs
    const allUniqueIds = new Set([...buttonIdsFromData, ...nestedComponentIds]);

    // Convert the Set to an Array to ensure unique button IDs
    const allButtonIdsFromData = Array.from(allUniqueIds);

    console.log("All Combined Unique IDs:", allButtonIdsFromData);

    // Step 3: Remove buttons from the group that are not in the new data list
    await CccRightsGroupButtons.destroy({
      where: {
        user_group_id: groupId,
        button_id: {
          [Op.notIn]: allButtonIdsFromData, // Only keep buttons that are in the new data list
        },
      },
    });

    // Step 4: Recursively process data and add missing buttons
    const processButton = async (item) => {
      const toUpdateButtonId = item;
      // Check if this button already exists in the group
      const existingButton = await CccRightsGroupButtons.findOne({
        where: {
          user_group_id: groupId,
          button_id: toUpdateButtonId,
        },
      });

      // If it doesn't exist, create a new entry
      if (!existingButton) {
        try {
          await CccRightsGroupButtons.create({
            user_group_id: groupId,
            button_id: toUpdateButtonId,
          });
        } catch (error) {}
      }
    };

    // Step 5: Process each button in the main data
    await Promise.all(allButtonIdsFromData.map(processButton));

    console.log(
      `Rights group buttons updated successfully for group ID ${groupId}`
    );
  } catch (error) {
    console.error(`Error updating rights group buttons: ${error.message}`);
    throw error;
  }
};

// const updateTreeViewDataForRoleQuery = async ({ roleId, data }) => {
//   try {
//     const { CccRightsRolesButtons } = setUpAssociationsCCC();

//     // Helper function to recursively extract all button ids, including nested ones
//     const extractButtonIds = (items, buttonIds = []) => {
//       items.forEach((item) => {
//         // Add current item id
//         buttonIds.push(item._id);

//         // If this item has nested children, recursively extract their ids
//         if (item._children && item._children.length > 0) {
//           extractButtonIds(item._children, buttonIds);
//         }
//       });
//       return buttonIds;
//     };

//     // Step 1: Extract all button ids (including nested ones) from the data
//     const buttonIdsFromData = extractButtonIds(data);

//     // Step 2: Remove buttons from the role that are not in the new data list
//     await CccRightsRolesButtons.destroy({
//       where: {
//         user_role_id: roleId,
//         button_id: {
//           [Op.notIn]: buttonIdsFromData, // Only keep buttons that are in the new data list
//         },
//       },
//     });

//     // Step 3: Recursively process data and add missing buttons
//     const processButton = async (item) => {
//       const toUpdateButtonId = item?._id ? item._id : item;

//       // Check if this button already exists in the role
//       const existingButton = await CccRightsRolesButtons.findOne({
//         where: {
//           user_role_id: roleId,
//           button_id: toUpdateButtonId,
//         },
//       });

//       // If it doesn't exist, create a new entry
//       if (!existingButton) {
//         await CccRightsRolesButtons.create({
//           user_role_id: roleId,
//           button_id: toUpdateButtonId,
//         });
//       }

//       // If this button has nested children, process them recursively
//       if (item._children && item._children.length > 0) {
//         for (const child of item._children) {
//           await processButton(child); // Recursively process each child
//         }
//       }
//     };

//     // Step 4: Loop through the main data and process each button
//     for (const item of data) {
//       await processButton(item);
//     }

//     console.log(
//       `Rights roles buttons updated successfully for role ID ${roleId}`
//     );
//   } catch (error) {
//     throw error;
//   }
// };

const updateTreeViewDataForRoleQuery = async ({ roleId, data }) => {
  try {
    const { CccRightsRolesButtons, CccMasterButtons } = setUpAssociationsCCC();

    // Helper to recursively get nested component IDs
    const getAllNestedComponentIds = async (
      componentPagesIds,
      collectedIds = new Set()
    ) => {
      const subButtons = await CccMasterButtons.findAll({
        where: {
          component_pages_id: componentPagesIds,
        },
        attributes: ["component_pages_id", "ccc_master_buttons_id"],
      });

      const nestedIds = subButtons.map(
        (record) => record.ccc_master_buttons_id
      );

      // Add to collected IDs
      nestedIds.forEach((id) => collectedIds.add(id));

      if (nestedIds.length > 0) {
        await Promise.all(
          nestedIds.map(async (id) => {
            await getAllNestedComponentIds([id], collectedIds);
          })
        );
      }

      return collectedIds;
    };

    // Helper function to recursively extract all button ids, including nested ones
    const extractButtonIds = (items, buttonIds = new Set()) => {
      items.forEach((item) => {
        const id = item?._id ? item._id : item;
        buttonIds.add(id);

        if (item._children && item._children.length > 0) {
          extractButtonIds(item._children, buttonIds);
        }
      });
      return buttonIds;
    };

    // Step 1: Extract all button ids (including nested ones) from the data
    const buttonIdsFromData = extractButtonIds(data);

    // Step 2: Get all nested component IDs and combine them with extracted button IDs
    const nestedComponentIds = await getAllNestedComponentIds([
      ...buttonIdsFromData,
    ]);

    // Combine both sets and return unique IDs
    const allUniqueIds = new Set([...buttonIdsFromData, ...nestedComponentIds]);

    // Convert the Set to an Array to ensure unique button IDs
    const allButtonIdsFromData = Array.from(allUniqueIds);

    console.log("All Combined Unique IDs:", allButtonIdsFromData);

    // Step 3: Remove buttons from the role that are not in the new data list
    await CccRightsRolesButtons.destroy({
      where: {
        user_role_id: roleId,
        button_id: {
          [Op.notIn]: allButtonIdsFromData, // Only keep buttons that are in the new data list
        },
      },
    });

    // Step 4: Recursively process data and add missing buttons
    const processButton = async (item) => {
      const toUpdateButtonId = item;
      // Check if this button already exists in the role
      const existingButton = await CccRightsRolesButtons.findOne({
        where: {
          user_role_id: roleId,
          button_id: toUpdateButtonId,
        },
      });

      // If it doesn't exist, create a new entry
      if (!existingButton) {
        await CccRightsRolesButtons.create({
          user_role_id: roleId,
          button_id: toUpdateButtonId,
        });
      }
    };

    // Step 5: Process each button in the main data
    await Promise.all(allButtonIdsFromData.map(processButton));

    console.log(
      `Rights roles buttons updated successfully for role ID ${roleId}`
    );
  } catch (error) {
    console.error(`Error updating rights roles buttons: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateTreeViewForAllPagesByGroupOrRoleIdQuery,
  updateTreeViewDataForGroupQuery,
  updateTreeViewDataForRoleQuery,
};
