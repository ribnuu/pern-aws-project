const client = require("../../config/db");
const userAffilaitionQueries = require("../../services/user-affiliations/queries");

const assignGroupRights = async (req, res) => {
  const user_group_id = req.body.user_group_id;
  const children = req.body;
  const buttons = children.button || [];
  const subComponents = children.subComponents || [];
  const components = children.components || [];

  try {
    // Remove buttons that are not in the request
    const buttonsStr = buttons.map(String);
    await client.query(
      `DELETE FROM ccc_rights_group_buttons
       WHERE user_group_id = $1 AND button_id <> ALL ($2::varchar[])`,
      [user_group_id, buttonsStr]
    );

    // Remove subComponents that are not in the request
    const subComponentsStr = subComponents.map(String);
    await client.query(
      `DELETE FROM ccc_rights_group_sub_pages
       WHERE user_group_id = $1 AND sub_pages_id <> ALL ($2::varchar[])`,
      [user_group_id, subComponentsStr]
    );

    // Remove components that are not in the request
    const componentsStr = components.map(String);
    await client.query(
      `DELETE FROM ccc_rights_group_pages
       WHERE user_group_id = $1 AND pages_id <> ALL ($2::varchar[])`,
      [user_group_id, componentsStr]
    );

    // Insert or update buttons
    for (const button of buttons) {
      await client.query(
        `INSERT INTO ccc_rights_group_buttons (user_group_id, button_id) 
         VALUES ($1, $2)
         ON CONFLICT (user_group_id, button_id) DO NOTHING`,
        [user_group_id, button]
      );
    }

    // Insert or update subComponents
    // ! Commented by Ahsan
    // for (const subComponent of subComponents) {
    //   await client.query(
    //     `INSERT INTO ccc_rights_group_sub_pages (user_group_id, sub_pages_id)
    //      VALUES ($1, $2)
    //      ON CONFLICT (user_group_id, sub_pages_id) DO NOTHING`,
    //     [user_group_id, subComponent]
    //   );
    // }

    // Insert or update components
    for (const component of components) {
      const result = await client.query(
        `SELECT 1 FROM ccc_rights_group_pages 
         WHERE user_group_id = $1 AND pages_id = $2`,
        [user_group_id, component]
      );

      if (result.rows.length === 0) {
        await client.query(
          `INSERT INTO ccc_rights_group_pages (user_group_id, pages_id) 
           VALUES ($1, $2)`,
          [user_group_id, component]
        );
      }
    }

    console.log("Insertion completed");
    res.send({
      success: true,
      msg: "Successfully updated",
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send({
      success: false,
      msg: "Error updating records",
    });
  }
};

const assignRoleRights = (req, res) => {
  const user_role_id = req.body.user_role_id;
  const children = req.body;
  const buttons = children.button;
  // const subComponents = children.subComponents;
  // const components = children.components;
  let i = 0;
  // while (i < buttons.length) {
  //   client.query(
  //     "INSERT INTO ccc_rights_roles_buttons (user_role_id , button_id) VALUES($1,$2)",
  //     [user_role_id, buttons[i]],
  //     (err, results) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //       }
  //     }
  //   );
  //   i++;
  // }
  // for (let i = 0; i < buttons.length; i++) {
  //   console.log(i);
  //   try {
  //     client.query(
  //       `INSERT INTO ccc_rights_roles_buttons (user_role_id, button_id)
  //        VALUES ($1, $2)
  //        ON CONFLICT (user_role_id, button_id) DO NOTHING`,
  //       [user_role_id, buttons[i]]
  //     );
  //   } catch (err) {
  //     console.error('Error inserting data:', err);
  //     res.send({
  //       success: false,
  //       msg: "Error inserting data",
  //       error: err,
  //     });
  //   }
  // }
  // Insert new records with ON CONFLICT DO NOTHING
  for (let i = 0; i < buttons.length; i++) {
    try {
      client.query(
        `INSERT INTO ccc_rights_roles_buttons (user_role_id, button_id)
         VALUES ($1, $2)
         ON CONFLICT (user_role_id, button_id) DO NOTHING`,
        [user_role_id, buttons[i]]
      );
    } catch (err) {
      console.error("Error inserting data:", err);
      throw err; // Rethrow to catch it in the outer try block
    }
  }

  // Convert buttons array to string type if button_id is character varying
  const buttonsStr = buttons.map(String);

  // Delete records that are not in the buttons list
  try {
    client.query(
      `DELETE FROM ccc_rights_roles_buttons
       WHERE user_role_id = $1 AND button_id <> ALL ($2::varchar[])`,
      [user_role_id, buttonsStr]
    );
  } catch (err) {
    console.error("Error deleting data:", err);
    throw err; // Rethrow to catch it in the outer try block
  }
  console.log("Insertion completed");
  res.send({
    success: true,
    msg: "Successfully updated",
  });
  // let j = 0;
  // while (j < subComponents.length) {
  //   client.query(
  //     "INSERT INTO ccc_rights_roles_sub_pages (user_role_id , sub_pages_id) VALUES($1,$2)",
  //     [user_role_id, subComponents[j]],
  //     (err, results) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //       }
  //     }
  //   );
  //   j++;
  // }
  // let k = 0;
  // while (k < components.length) {
  //   client.query(
  //     "INSERT INTO ccc_rights_roles_pages (user_role_id ,pages_id) VALUES($1,$2)",
  //     [user_role_id, components[k]],
  //     (err, results) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //       }
  //     }
  //   );
  //   k++;
  // }
};

const getUserButtonRightsByRoleId = (req, res) => {
  // "SELECT * FROM ccc_master_buttons as cmb INNER JOIN ccc_rights_roles_buttons as crrb ON crrb.button_id = cmb.ccc_master_buttons_id WHERE crrb.user_role_id = $1 AND cmb.component_pages_id = $2 ORDER BY cmb.ccc_master_buttons_id"
  // [user_id, component_id],
  const { roleId } = req.params;
  client.query(
    "SELECT * FROM ccc_rights_roles_buttons WHERE user_role_id = $1",
    // "SELECT * FROM ccc_master_buttons as cmb INNER JOIN ccc_rights_roles_buttons as crrb ON crrb.button_id = cmb.ccc_master_buttons_id WHERE crrb.user_role_id = $1 AND cmb.component_pages_id = $2 ORDER BY cmb.ccc_master_buttons_id",
    [roleId],
    (err, results) => {
      if (err) {
        console.error("Rights Controller" + err);
        res.send({ success: false, msg: "Failed to fetch data" });
      } else {
        res.send({ success: true, results });
      }
    }
  );
};

const getUserButtonRightsByGroupId = (req, res) => {
  const { groupId } = req.params;
  client.query(
    "SELECT * FROM ccc_rights_group_buttons WHERE user_group_id = $1",
    [groupId],
    (err, results) => {
      if (err) {
        console.error("Rights Controller" + err);
        res.send({ success: false, msg: "Failed to fetch data" });
      } else {
        res.send({ success: true, results });
      }
    }
  );
};

const assignUserRights = async (req, res) => {
  const user_id = req.body.user_id;
  const children = req.body;
  const subComponents = children.subComponents;
  const components = children.components;
  const status = true;
  let i = 0;
  const buttons = children.button;
  while (i < buttons.length) {
    let current_button_id = buttons[i];
    client.query(
      "SELECT * FROM ccc_rights_users_buttons WHERE user_id = $1 AND buttons_id = $2",
      [user_id, current_button_id],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          if (!results.rowCount > 0) {
            client.query(
              "INSERT INTO ccc_rights_users_buttons (user_id , buttons_id, status) VALUES( $1 , $2 , $3)",
              [user_id, current_button_id, status],
              (err2, results2) => {
                if (err2) {
                  console.error(err2);
                } else {
                }
              }
            );
          }
        }
      }
    );
    i++;
  }
  let j = 0;
  while (j < subComponents.length) {
    client.query(
      "INSERT INTO ccc_rights_users_sub_pages (user_id , sub_pages_id) VALUES($1,$2)",
      [user_id, subComponents[j]],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
    j++;
  }
  let k = 0;
  while (k < components.length) {
    client.query(
      "INSERT INTO ccc_rights_users_pages (user_id ,pages_id) VALUES($1,$2)",
      [user_id, components[k]],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
    k++;
  }
};

const getUserButtonsRightsByUserId = (req, res) => {
  const user_id = req.body.user_id;
  client.query(
    "SELECT * FROM ccc_rights_users_buttons WHERE user_id = $1 AND status = 'true' ",
    [user_id],
    (err, results) => {
      if (err) {
        console.error("Rights Controller" + err);
      } else {
        res.send(results);
      }
    }
  );
};

const getUserPagesRightsByUserIdAndComponentId = (req, res) => {
  const user_id = req.body.user_id;
  const component_id = req.body.component_id;
  client.query(
    "SELECT * FROM ccc_rights_users_pages WHERE user_id = $1 AND pages_id = $2",
    [user_id, component_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const getUserButtonsRightsByUserIdAndByComponentsId = async (req, res) => {
  const user_id = req.body.user_id;
  const component_id = req.body.component_id;
  console.log("User Id Rights + ", user_id);
  console.log("Component Id + ", component_id);

  try {
    const userAffiliationsResultsByUserId =
      await userAffilaitionQueries.getUserAffilaitionsByUserIdQuery(user_id);

    if (
      !userAffiliationsResultsByUserId ||
      userAffiliationsResultsByUserId.length <= 0
    ) {
      console.log("No matching affiliations found");
      return res.send({
        success: false,
        msg: "No matching affiliations found",
      });
    }

    // Collect all unique roles and groups from the affiliations
    const roles = new Set();
    const groups = new Set();

    userAffiliationsResultsByUserId.forEach((row) => {
      console.log(row);
      if (row.role_id) roles.add(row.role_id);
      if (row.group_id) groups.add(row.group_id);
    });

    // Fetch buttons based on all user roles
    const roleButtonsResult = await client.query(
      `SELECT cmb.* 
       FROM ccc_master_buttons AS cmb 
       INNER JOIN ccc_rights_roles_buttons AS crrb 
       ON cmb.ccc_master_buttons_id = crrb.button_id 
       WHERE crrb.user_role_id = ANY($1)`,
      [Array.from(roles)]
    );

    // Fetch buttons based on all user groups
    const groupButtonsResult = await client.query(
      `SELECT cmb.* 
       FROM ccc_master_buttons AS cmb 
       INNER JOIN ccc_rights_group_buttons AS crrb 
       ON cmb.ccc_master_buttons_id = crrb.button_id 
       WHERE crrb.user_group_id = ANY($1)`,
      [Array.from(groups)]
    );

    console.log("Role-based buttons:", roleButtonsResult.rows);

    // Fetch buttons based on user id and component id
    const userComponentButtonsResult = await client.query(
      `SELECT cmb.* 
       FROM ccc_master_buttons AS cmb 
       INNER JOIN ccc_rights_users_buttons AS crub 
       ON crub.buttons_id = cmb.ccc_master_buttons_id 
       WHERE crub.user_id = $1 AND cmb.component_pages_id = $2 
       ORDER BY cmb.ccc_master_buttons_id`,
      [user_id, component_id]
    );

    console.log(
      "User and component-based buttons:",
      userComponentButtonsResult.rows
    );

    // Combine and deduplicate results from role-based, group-based, and user-component-based buttons
    const buttonMap = new Map();

    roleButtonsResult.rows.forEach((button) =>
      buttonMap.set(button.ccc_master_buttons_id, button)
    );
    groupButtonsResult.rows.forEach((button) =>
      buttonMap.set(button.ccc_master_buttons_id, button)
    );
    userComponentButtonsResult.rows.forEach((button) =>
      buttonMap.set(button.ccc_master_buttons_id, button)
    );

    // Convert the map values to an array for response
    const allButtons = Array.from(buttonMap.values());

    // Send the combined result
    res.send(allButtons);
  } catch (err) {
    console.error("Error querying data:", err);
    res.status(500).json({
      error: "Failed to create reps paid commission record",
      msg: "Error querying data",
    });
  }
};

const revokeUserButtonsRightsByUserId = (req, res) => {
  const { user_id, RevokeButtonsList } = req.body;
  console.log(user_id);
  console.log(RevokeButtonsList);

  for (let i = 0; i < RevokeButtonsList.length; i++) {
    client.query(
      "DELETE FROM ccc_rights_users_buttons WHERE user_id = $1 AND buttons_id = $2",
      [user_id, RevokeButtonsList[i]],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
        }
      }
    );
  }
};

const getAllLandingPageButtonsByUserIdController = async (req, res) => {
  try {
    const { userId } = req.body;
    const data =
      await userAffilaitionQueries.getAllLandingPageButtonsByUserIdQuery(
        userId
      );
    res.send({ data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load landing page buttons by user id",
      msg: "Error querying data",
    });
  }
};

const getButtonsByUserAndPageIdController = async (req, res) => {
  try {
    const { userId, pageId } = req.body;
    const data = await userAffilaitionQueries.getButtonsByUserAndPageIdQuery(
      userId,
      pageId
    );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load buttons by page and user id",
      msg: "Error querying data",
    });
  }
};

const getButtonsByButtonIdAndUserIdController = async (req, res) => {
  try {
    const { userId, buttonId } = req.body;

    console.log(userId, buttonId);

    const data =
      await userAffilaitionQueries.getButtonsByButtonIdAndUserIdQuery(
        userId,
        buttonId
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load buttons by button id and user id",
      msg: "Error querying data",
    });
  }
};

module.exports = {
  assignUserRights,
  assignGroupRights,
  assignRoleRights,

  getUserPagesRightsByUserIdAndComponentId,
  getUserButtonsRightsByUserId,
  getUserButtonsRightsByUserIdAndByComponentsId,

  revokeUserButtonsRightsByUserId,

  getUserButtonRightsByRoleId,
  getUserButtonRightsByGroupId,

  getAllLandingPageButtonsByUserIdController,
  getButtonsByUserAndPageIdController,
  getButtonsByButtonIdAndUserIdController,
};
