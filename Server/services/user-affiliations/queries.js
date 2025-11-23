const { Op } = require("sequelize");
const client = require("../../config/db");
const setUpAssociationsCCC = require("../../models/ccc");

const getAffiliationsByGroupAndRoleIdQuery = async (groupId, roleId) => {
  const query = `
    SELECT um.*, ua.group_id AS ua_group_id, ua.role_id AS ua_role_id, ua.id AS ua_id
    FROM ccc_user_affiliations ua
    INNER JOIN ccc_user_masterfile um ON ua.user_id = um.user_id
    WHERE ua.group_id = $1 AND ua.role_id = $2
  `;

  const values = [groupId, roleId];

  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    throw error;
  }
};

const removeAffilaitionsQuery = async (userAffilaitionIdsToRemove = []) => {
  try {
    if (userAffilaitionIdsToRemove.length === 0) {
      console.log("No affiliations to remove.");
      return; // Exit early if there are no IDs to remove
    }

    const query = `
      DELETE FROM ccc_user_affiliations
      WHERE id IN (${userAffilaitionIdsToRemove.map((_, index) => `$${index + 1}`).join(", ")})
    `;
    const values = userAffilaitionIdsToRemove;

    const res = await client.query(query, values);
    console.log(`${res.rowCount} affiliations removed successfully.`);
  } catch (error) {
    console.error("Error removing affiliations:", error);
    throw error;
  }
};

const addAffiliationsForUsersQuery = async (users, groupId, roleId) => {
  try {
    if (users.length > 0) {
      const query = `
        INSERT INTO ccc_user_affiliations (user_id, group_id, role_id)
        VALUES ${users.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(", ")}
        ON CONFLICT (user_id, group_id, role_id) DO NOTHING
      `;
      const values = users.flatMap((userId) => [userId, groupId, roleId]);

      await client.query(query, values);
      console.log("Affiliations added successfully");
    }
  } catch (error) {
    console.error("Error adding affiliations:", error);
    throw error;
  }
};

const getUserGroupDatabaseByGroupIdQuery = async (groupId) => {
  try {
    // Query the ccc_user_group table to get the user_group_database
    const result = await client.query(
      `SELECT user_group_database FROM ccc_user_group WHERE user_group_id = $1`,
      [groupId]
    );

    // Get the user_group_database from the query result, or set it to null if not found
    const user_group_database =
      result.rows.length > 0 ? result.rows[0].user_group_database : null;

    return user_group_database;

    // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(
      "Error fetching user group database name by group id query:",
      error
    );
    throw error;
  }
};

const getUserAffilaitionsByUserIdQuery = async (userId) => {
  try {
    const { CccUserAffiliations } = setUpAssociationsCCC();
    // Fetch records that need to be updated
    const records = await CccUserAffiliations.findAll({
      where: {
        user_id: userId,
      },
    });
    console.log(records);
    return records;
  } catch (error) {
    throw error;
  }
};

const getAllLandingPageButtonsByUserIdQuery = async (userId) => {
  try {
    const {
      CccUserAffiliations,
      CccRightsGroupButtons,
      CccUserGroup,
      CccMasterButtons,
      CccMasterPages,
      CccRightsGroupPages,
      CccRightsRolesButtons,
      CccUserRole,
    } = setUpAssociationsCCC();

    // Fetch user-specific buttons
    const records = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: [
        {
          model: CccUserGroup,
          as: "group",
          include: [
            {
              model: CccRightsGroupButtons,
              as: "rightsGroupButtons",
              include: [
                {
                  model: CccMasterButtons,
                  as: "button",
                  include: {
                    model: CccMasterPages,
                    as: "mPage",
                  },
                },
              ],
            },
            {
              model: CccRightsGroupPages,
              as: "rightsGroupPages",
              include: {
                model: CccMasterPages,
                as: "page",
              },
            },
          ],
        },
        {
          model: CccUserRole,
          as: "role",
          include: [
            {
              model: CccRightsRolesButtons,
              as: "rightsRoleButtons",
              include: [
                {
                  model: CccMasterButtons,
                  as: "button",
                  include: {
                    model: CccMasterPages,
                    as: "page",
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    const jsonRecords = records.map((record) => record.toJSON());

    // Function to find and append missing pages
    const findAndAppendMissingPages = (pages, newPage) => {
      const pageExists = pages.some(
        (page) => page.pages_id === newPage.pages_id
      );
      if (!pageExists) {
        pages.push(newPage); // Append the new page if it doesn't exist
      }
    };

    // Extract user-specific buttons
    const userButtons = jsonRecords
      .flatMap((record) => [
        // Extract pages from rightsGroupButtons
        ...record.group.rightsGroupButtons
          .map((button) => button.button.mPage)
          .filter((page) => page !== null && page !== undefined),

        // Extract pages from rightsGroupPages
        ...record.group.rightsGroupPages
          .map((item) => item.page)
          .filter((page) => page !== null && page !== undefined),

        // Extract pages from rightsRoleButtons
        ...record.role.rightsRoleButtons
          .map((button) => button.button.page)
          .filter((page) => page !== null && page !== undefined),
      ])
      .filter(
        (page, index, self) =>
          index === self.findIndex((p) => p.pages_id === page.pages_id)
      );

    // // Define universal buttons that should always be available
    // const universalButtons = await CccMasterButtons.findAll({
    //   where: {
    //     // Assuming there are fields in CccMasterButtons that correspond to roles
    //     // If the fields for filtering are different, adjust accordingly
    //     // Example placeholders; replace these with actual fields
    //     button_function_name: "citizenGeneralPortal", // Replace with actual criteria as needed
    //   },
    //   include: {
    //     model: CccMasterPages,
    //     as: "mPage", // Must match the alias defined in the association
    //   },
    // });

    // // Extract universal button pages
    // const universalButtonPages = universalButtons
    //   .map((button) => button.mPage)
    //   .filter((page) => page !== null && page !== undefined);

    // // Combine user-specific buttons and universal buttons
    // const combinedButtons = [...userButtons, ...universalButtonPages].filter(
    //   (page, index, self) =>
    //     index === self.findIndex((p) => p.pages_id === page.pages_id) // Ensure unique pages based on pages_id
    // );

    // Combine user-specific buttons and universal buttons
    const combinedButtons = [...userButtons].filter(
      (page, index, self) =>
        index === self.findIndex((p) => p.pages_id === page.pages_id) // Ensure unique pages based on pages_id
    );

    return combinedButtons;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// const getAllLandingPageButtonsByUserIdQuery = async (userId) => {
//   try {
//     const {
//       CccUserAffiliations,
//       CccRightsGroupButtons,
//       CccUserGroup,
//       CccMasterButtons,
//       CccMasterPages,
//       CccRightsGroupPages,
//       CccRightsRolesButtons,
//       CccUserRole,
//     } = setUpAssociationsCCC();

//     const records = await CccUserAffiliations.findAll({
//       where: {
//         user_id: userId,
//       },
//       include: [
//         {
//           model: CccUserGroup,
//           as: "group",
//           include: [
//             {
//               model: CccRightsGroupButtons,
//               as: "rightsGroupButtons",
//               include: [
//                 {
//                   model: CccMasterButtons,
//                   as: "button",
//                   include: {
//                     model: CccMasterPages,
//                     as: "mPage",
//                   },
//                 },
//               ],
//             },
//             {
//               model: CccRightsGroupPages,
//               as: "rightsGroupPages",
//               include: {
//                 model: CccMasterPages,
//                 as: "page",
//               },
//             },
//           ],
//         },
//         {
//           model: CccUserRole, // Including roles
//           as: "role",
//           include: [
//             {
//               model: CccRightsRolesButtons, // Including the role buttons
//               as: "rightsRoleButtons",
//               include: [
//                 {
//                   model: CccMasterButtons,
//                   as: "button",
//                   include: {
//                     model: CccMasterPages,
//                     as: "page",
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     const jsonRecords = records.map((record) => record.toJSON());
//     console.log(jsonRecords.toString());

//     // Function to find and append missing pages
//     const findAndAppendMissingPages = (pages, newPage) => {
//       const pageExists = pages.some(
//         (page) => page.pages_id === newPage.pages_id
//       );
//       if (!pageExists) {
//         pages.push(newPage); // Append the new page if it doesn't exist
//       }
//     };

//     // const uniquePages = await CccMasterPages.findAll();

//     const formattedRecords = jsonRecords
//       .flatMap((record) => [
//         // Extract pages from rightsGroupButtons
//         ...record.group.rightsGroupButtons
//           .map((button) => button.button.mPage)
//           .filter((page) => page !== null && page !== undefined),

//         // Extract pages from rightsGroupPages
//         ...record.group.rightsGroupPages
//           .map((item) => item.page)
//           .filter((page) => page !== null && page !== undefined),

//         // Extract pages from rightsRoleButtons (NEW)
//         ...record.role.rightsRoleButtons
//           .map((button) => button.button.page)
//           .filter((page) => page !== null && page !== undefined),
//       ])
//       .filter(
//         (page, index, self) =>
//           index === self.findIndex((p) => p.pages_id === page.pages_id) // Ensure unique pages based on pages_id
//       );

//     return formattedRecords;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

const getButtonsByUserAndPageIdQuery = async (userId, pageId) => {
  try {
    const {
      CccUserAffiliations,
      CccRightsGroupButtons,
      CccMasterButtons,
      CccUserGroup,
      CccRightsGroupPages,
      CccMasterPages,
      CccRightsRolesButtons,
      CccUserRole,
    } = setUpAssociationsCCC();

    // Initialize an empty array to store all button data
    let allButtons = [];
    const buttonSet = new Set(); // Create a set to track unique button IDs

    // ! New Impl
    const nn = await CccMasterButtons.findOne({
      where: {
        component_pages_id: pageId,
      },
      // attributes: ["ccc_master_buttons_id"],
    });

    const master_buttons_id = nn?.ccc_master_buttons_id;

    const nnn = await CccMasterButtons.findAll({
      where: {
        component_pages_id: master_buttons_id,
      },
      include: {
        model: CccRightsGroupButtons,
        as: "rightsGroupMasterButtons",
        required: true,
        attributes: [],
      },
    });

    if (nnn && nnn.length > 0) {
      allButtons.push(nn);
      buttonSet.add(master_buttons_id);
    }

    // ! End New Impl

    // Step 1: Fetch data with necessary associations
    const buttons = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: {
        model: CccUserGroup,
        as: "group",
        include: [
          {
            model: CccRightsGroupButtons,
            as: "rightsGroupButtons",
            include: [
              {
                model: CccMasterButtons,
                as: "button",
                // where: { component_pages_id: pageId },
                where: {
                  [Op.or]: [
                    { component_pages_id: pageId },
                    // { ccc_master_pages_id: pageId },
                  ],
                },
              },
            ],
          },
        ],
      },
    });

    const buttonsSetGroupAndPageWise = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: {
        model: CccUserGroup,
        as: "group",
        include: {
          model: CccRightsGroupPages,
          as: "rightsGroupPages",
          where: { pages_id: pageId },
          include: {
            model: CccMasterPages,
            as: "page",
            include: {
              model: CccMasterButtons,
              as: "buttons",
            },
          },
          required: false,
        },
      },
    });

    // Step 3: Fetch buttons through user roles (CccRightsRolesButtons)
    const roleButtons = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: {
        model: CccUserRole,
        as: "role",
        include: {
          model: CccRightsRolesButtons,
          as: "rightsRoleButtons",
          include: [
            {
              model: CccMasterButtons,
              as: "button",
              where: { component_pages_id: pageId },
            },
          ],
        },
      },
    });

    // Iterate through the data and collect button data
    buttonsSetGroupAndPageWise.forEach((affiliation) => {
      affiliation.group.rightsGroupPages.forEach((rightsGroupPage) => {
        rightsGroupPage.page.buttons.forEach((button) => {
          allButtons.push(button.dataValues); // Store button data in the array
        });
      });
    });

    buttons.forEach((affiliation) => {
      affiliation.group.rightsGroupButtons.forEach((rightsGroupButton) => {
        const buttonId = rightsGroupButton.button.ccc_master_buttons_id;

        // Check if the button ID is already in the set
        if (!buttonSet.has(buttonId)) {
          buttonSet.add(buttonId); // Add to the set
          allButtons.push(rightsGroupButton.button); // Add the button to the array
        }
      });
    });

    // Collect buttons from roles
    roleButtons.forEach((affiliation) => {
      affiliation.role.rightsRoleButtons.forEach((roleButton) => {
        const buttonId = roleButton.button.ccc_master_buttons_id;
        // Check if the button ID is already in the set
        if (!buttonSet.has(buttonId)) {
          buttonSet.add(buttonId); // Add to the set
          allButtons.push(roleButton.button); // Add the button to the array
        }
      });
    });

    return allButtons;
  } catch (error) {
    console.error("Error fetching buttons:", error);
    throw error;
  }
};

const getButtonsByButtonIdAndUserIdQuery = async (userId, buttonId) => {
  try {
    const {
      CccRightsGroupButtons,
      CccUserGroup,
      CccRightsGroupPages,
      CccMasterPages,
      CccUserAffiliations,
      CccMasterButtons,
      CccUserRole,
      CccRightsRolesButtons,
    } = setUpAssociationsCCC();

    // Step 1: Fetch data with necessary associations
    const buttons = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: {
        model: CccUserRole,
        as: "role",
        include: [
          {
            model: CccRightsRolesButtons,
            as: "rightsRoleButtons",
            include: [
              {
                model: CccMasterButtons,
                as: "button",
                where: { component_pages_id: buttonId },
              },
            ],
          },
        ],
      },
    });

    // Step 1: Fetch data with necessary associations
    const gButtons = await CccUserAffiliations.findAll({
      where: { user_id: userId },
      include: {
        model: CccUserGroup,
        as: "group",
        include: [
          {
            model: CccRightsGroupButtons,
            as: "rightsGroupButtons",
            include: [
              {
                model: CccMasterButtons,
                as: "button",
                where: { component_pages_id: buttonId },
              },
            ],
          },
        ],
      },
    });

    // Initialize an empty object to store all button data
    const allButtons = {};

    // Convert gButtons to JSON format and add buttons if not already present
    gButtons.map((affiliation) => {
      affiliation.group.rightsGroupButtons.forEach((rightsGroupButton) => {
        const button = rightsGroupButton.button;

        // Only add if the button is not already in allButtons
        if (!allButtons[button.ccc_master_buttons_id]) {
          allButtons[button.ccc_master_buttons_id] = {
            button_display_name: button.button_display_name,
            button_function_name: button.button_function_name,
            button_routes: button.button_routes,
            ccc_master_buttons_id: button.ccc_master_buttons_id,
            component_pages_id: button.component_pages_id,
          };
        }
      });
    });

    // Convert buttons to JSON format and add buttons if not already present
    buttons.map((affiliation) => {
      affiliation.role.rightsRoleButtons.forEach((rightsRoleButton) => {
        const button = rightsRoleButton.button;

        // Only add if the button is not already in allButtons
        if (!allButtons[button.ccc_master_buttons_id]) {
          allButtons[button.ccc_master_buttons_id] = {
            button_display_name: button.button_display_name,
            button_function_name: button.button_function_name,
            button_routes: button.button_routes,
            ccc_master_buttons_id: button.ccc_master_buttons_id,
            component_pages_id: button.component_pages_id,
          };
        }
      });
    });

    return allButtons;
  } catch (error) {
    console.error("Error fetching buttons:", error);
    throw error;
  }
};

module.exports = {
  getAffiliationsByGroupAndRoleIdQuery,
  addAffiliationsForUsersQuery,
  removeAffilaitionsQuery,
  getUserGroupDatabaseByGroupIdQuery,
  getUserAffilaitionsByUserIdQuery,
  getAllLandingPageButtonsByUserIdQuery,
  getButtonsByUserAndPageIdQuery,
  getButtonsByButtonIdAndUserIdQuery,
};

// button_display_name : "Billing Screen"
// button_function_name : "billingScreen"
// button_routes : "/bln"
// ccc_master_buttons_id : "1006000000000100"
// component_pages_id : "1004000000000012"
