const client = require("../../config/db");
const pagesService = require("../../services/pages/pagesService");

const getPagesByGroupId = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await pagesService.getPagesByGroupIdService(groupId);
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to get pages by group id````" });
  }
};

const getComponents = (req, res) => {
  client.query("SELECT * FROM ccc_master_pages", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      // const individualRows = results.rows;
      // let parentRows = [];
      // individualRows.forEach((row) => {
      //   let page_id = row.pages_id;
      //   client.query(
      //     "SELECT * FROM ccc_master_pagessub WHERE children_page_id = $1",
      //     [page_id],
      //     (err2, results2) => {
      //       if (err2) {
      //         console.error(err2);
      //       } else {
      //       }
      //     }
      //   );
      // });
      res.send(results);
    }
  });
};

const getSubComponents = (req, res) => {
  client.query("SELECT * FROM ccc_master_sub_pages  ", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const getButtons = (req, res) => {
  client.query("SELECT * FROM ccc_master_buttons ", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const createComponent = (req, res) => {
  const { component_name, file_name, page_url, folder_name } =
    req.body.formData;
  const pages_id = req.body.LastComponentId;

  client.query(
    "INSERT INTO ccc_master_pages (component_name , file_name , folder_name , page_url ,pages_id) VALUES ($1,$2,$3,$4 , $5)",
    [component_name, file_name, folder_name, page_url, pages_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};
const createButton = (req, res) => {
  console.log("Route");
  const {
    button_display_name,
    button_function_name,
    component_pages_id,
    button_routes,
  } = req.body.formData;

  // Insert query with RETURNING clause to get the newly created record
  client.query(
    "INSERT INTO ccc_master_buttons (button_display_name, button_function_name, component_pages_id, button_routes) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      button_display_name,
      button_function_name,
      component_pages_id,
      button_routes,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Send back the newly created record
        res.status(201).json(results);
      }
    }
  );
};

const retrieveLastComponentId = (req, res) => {
  client.query(
    "SELECT * FROM ccc_master_pages ORDER BY pages_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastButtonId = (req, res) => {
  client.query(
    "SELECT * FROM ccc_master_buttons ORDER BY ccc_master_buttons_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  getComponents,
  getSubComponents,
  getButtons,
  retrieveLastComponentId,
  retrieveLastButtonId,
  createComponent,
  createButton,
  getPagesByGroupId,
};
