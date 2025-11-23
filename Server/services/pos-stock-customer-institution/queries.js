const { getClient } = require("../../config/dbClientPool");
const setUpAssociations = require("../../models/pos");
const { Sequelize } = require("sequelize");

const getStockCustomerInstitutionLogoFilePathQuery = async (institutionId) => {
  const client = await getClient("pos_database_duke");
  try {
    const query = `
      SELECT company_logo_file_path
      FROM stock_customer_institution sci
      WHERE sci.id = $1
    `;

    const values = [institutionId];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Failed to getstock customer institution logo query");
    throw error;
  }
};

const stockCustomerInstitutionToggleDeletionQuery = async (
  institutionId,
  userId
) => {
  try {
    const { StockInstitutionStaff } = setUpAssociations("pos_database_duke");

    const existingInstitutionStaffRecord = await StockInstitutionStaff.findOne({
      where: {
        stock_customer_person_id: userId,
        institution_id: institutionId,
      },
    });

    if (!existingInstitutionStaffRecord) {
      throw new Error("Record not found");
    }

    if (existingInstitutionStaffRecord) {
      await StockInstitutionStaff.update(
        { is_deleted: !existingInstitutionStaffRecord.is_deleted },
        {
          where: {
            stock_customer_person_id: userId,
            institution_id: institutionId,
          },
        }
      );
    }
  } catch (error) {
    console.error("Failed to toggle deletion status:", error);
    throw error;
  }
};

const createStockCustomerInstitutionQuery = async ({
  name,
  phone_one,
  phone_two,
  mobile_number,
  email,
  web,
  created_by,
  latitude = null,
  longitude = null,
  location_url = "",
  is_active = false,
  active_status_change_reason = "",
}) => {
  try {
    const db_name = "pos_database_duke";
    const { StockCustomerInstitution } = setUpAssociations(db_name);

    const updatedLat = latitude === "" ? null : latitude;
    const updatedLon = longitude === "" ? null : longitude;

    const insertedRow = await StockCustomerInstitution.create(
      {
        name: name,
        phone_1: phone_one,
        phone_2: phone_two,
        mobile_number: mobile_number,
        email: email,
        web: web,
        created_by: created_by,
        latitude: updatedLat,
        longitude: updatedLon,
        location_url: location_url,
        is_active,
        active_status_change_reason,
      },
      { returning: true }
    );

    return insertedRow;
  } catch (error) {
    console.error("Error inserting customer institution: ", error);
    throw error;
  }
};

const updateStockCustomerInstitutionQuery = async ({
  id,
  name,
  phone_one,
  phone_two,
  mobile_number,
  email,
  web,
  company_logo_file_path,
  latitude,
  longitude,
  location_url,
  is_active,
  active_status_change_reason,
}) => {
  try {
    const db_name = "pos_database_duke";
    const { StockCustomerInstitution } = setUpAssociations(db_name);

    const [updatedRowCount, [updatedInstitution]] =
      await StockCustomerInstitution.update(
        {
          name,
          phone_1: phone_one,
          phone_2: phone_two,
          mobile_number,
          email,
          web,
          company_logo_file_path,
          latitude,
          longitude,
          location_url,
          updated_at: new Date(), // Set updated_at to current date
          is_active,
          active_status_change_reason,
        },
        {
          where: {
            id, // Update the record where the id matches
          },
          returning: true, // Request to return the updated rows
        }
      );

    if (updatedRowCount === 0) {
      throw new Error("No institution found with the given id");
    }

    console.log("Updated stock customer institution successfully:", id);
    return { id, ...updatedInstitution.dataValues }; // Return the updated data
  } catch (error) {
    console.error("Error updating customer institution: ", error);
    throw error;
  }
};

const getAllCustomerPersonsByCustomerInstitutionIdQuery = async (id) => {
  try {
    const db_name = "pos_database_duke";
    const { StockCustomerPerson, StockInstitutionStaff } =
      setUpAssociations(db_name);

    const data = await StockInstitutionStaff.findAll({
      where: {
        institution_id: id, // Matching institution_id with the provided UUID
      },
      include: [
        {
          model: StockCustomerPerson,
          as: "institutionStaffCustomerPerson", // Ensure the alias matches the association in the model
          attributes: ["id", "name", "address", "mobile_number"], // Only fetch specific fields from StockCustomerPerson
        },
      ],
      attributes: ["id", "created_at", "updated_at", "is_deleted"], // Only fetch specific fields from StockInstitutionStaff
    });

    // Transform the data to match the desired structure
    const transformedData = data.map((item) => ({
      id: item.institutionStaffCustomerPerson.id,
      name: item.institutionStaffCustomerPerson.name,
      address: item.institutionStaffCustomerPerson.address,
      mobile_number: item.institutionStaffCustomerPerson.mobile_number,
      stock_institution_staff_id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_deleted: item.is_deleted,
    }));

    return { rows: transformedData, rowCount: data.length };
  } catch (error) {
    console.error("Error fetching customer persons by institution ID: ", error);
    throw new Error("Error fetching customer persons by institution ID");
  }
};

const createOrUpdateListOfPersonsInCustomerInstitutionQuery = async (
  id,
  users
) => {
  const client = await getClient("pos_database_duke");
  try {
    // Begin transaction
    await client.query("BEGIN");

    for (const user of users) {
      if (!user.name || !user.address || !user.mobile_number) continue; // Skip invalid records

      // Check if record exists based on the last 9 digits of the mobile number
      const checkQuery = `
        SELECT id
        FROM stock_customer_person
        WHERE RIGHT(mobile_number, 9) = $1;
      `;
      const checkValues = [user.mobile_number.slice(-9)];
      const { rows: checkRows } = await client.query(checkQuery, checkValues);

      let customerPersonId;

      if (checkRows.length > 0) {
        customerPersonId = checkRows[0].id;

        // Update existing record in stock_customer_person
        const updateQuery = `
          UPDATE stock_customer_person
          SET name = $1, address = $2, mobile_number = $3
          WHERE id = $4;
        `;
        const updateValues = [
          user.name,
          user.address,
          user.mobile_number,
          customerPersonId,
        ];
        await client.query(updateQuery, updateValues);
      } else {
        // Insert new record into stock_customer_person
        const insertQuery = `
          INSERT INTO stock_customer_person (id, name, address, mobile_number)
          VALUES (uuid_generate_v4(), $1, $2, $3)
          RETURNING id;
        `;
        const insertValues = [user.name, user.address, user.mobile_number];
        const { rows: insertRows } = await client.query(
          insertQuery,
          insertValues
        );
        customerPersonId = insertRows[0].id;
      }

      // Check if record exists in stock_institution_staff
      const staffCheckQuery = `
        SELECT id
        FROM stock_institution_staff
        WHERE stock_customer_person_id = $1 AND institution_id = $2;
      `;
      const staffCheckValues = [customerPersonId, id];
      const { rows: staffCheckRows } = await client.query(
        staffCheckQuery,
        staffCheckValues
      );

      if (staffCheckRows.length === 0) {
        // Insert new record into stock_institution_staff
        const staffInsertQuery = `
          INSERT INTO stock_institution_staff (id, institution_id, stock_customer_person_id)
          VALUES (uuid_generate_v4(), $1, $2);
        `;
        const staffInsertValues = [id, customerPersonId];
        await client.query(staffInsertQuery, staffInsertValues);
      }
    }

    // Commit transaction
    await client.query("COMMIT");
    console.log("Users and staff saved successfully.");
  } catch (error) {
    // Rollback transaction in case of error
    await client.query("ROLLBACK");
    console.error("Error saving customer persons and staff: ", error);
    throw error;
  } finally {
    // client.release();
  }
};

// const getAllStockCustomerInstitutionsQuery = async (
//   attributes = null,
//   includeModels = []
// ) => {
//   try {
//     const {
//       StockCustomerInstitution,
//       StockInstitutionRepresentative,
//       StockCustomerPerson,
//       Address,
//       StockBillHeader,
//       sequelize,
//     } = setUpAssociations("pos_database_duke");

//     const includes = [];

//     if (includeModels.includes("Address")) {
//       includes.push({
//         model: Address,
//         as: "addresses",
//         attributes: [
//           "city",
//           "street_address",
//           "address_line_2",
//           "country",
//           "district",
//           "province",
//           "postal_code",
//         ],
//         limit: 1,
//       });
//     }

//     includes.push({
//       model: StockBillHeader,
//       as: "bills",
//       attributes: [
//         // Count total bills
//         [sequelize.fn("COUNT", sequelize.col("bills.id")), "totalBillsCount"],

//         // Count pending bills (where paid_status is false)
//         [
//           sequelize.fn(
//             "COUNT",
//             sequelize.where(sequelize.col("bills.paid_status"), false)
//           ),
//           "pendingBillsCount",
//         ],

//         // Get the latest bill date (assuming created_at for the last bill)
//         [
//           sequelize.fn("MAX", sequelize.col("bills.created_at")),
//           "lastBillDate",
//         ],
//       ],
//       required: false,
//       limit: 1,
//     });

//     // Define the query options
//     const queryOptions = {
//       include: [
//         {
//           model: StockInstitutionRepresentative,
//           as: "representatives",
//           include: {
//             model: StockCustomerPerson,
//             as: "customerPerson",
//           },
//         },
//         ...includes,
//       ],
// group: [
//   "StockCustomerInstitution.id",
//   "representatives.id",
//   "representatives->customerPerson.id", // Add this to the group by clause
//   "bills.id",
// ], // Now, you include "representatives->customerPerson.id"
//     };

//     // Include attributes if specified
//     if (attributes) {
//       queryOptions.attributes = attributes; // Only fetch the specified attributes
//     }

//     const data = await StockCustomerInstitution.findAll(queryOptions);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

const getAllStockCustomerInstitutionsQuery = async (
  attributes = null,
  includeModels = []
) => {
  try {
    const {
      StockCustomerInstitution,
      StockInstitutionRepresentative,
      StockCustomerPerson,
      Address,
      StockBillHeader,
    } = setUpAssociations("pos_database_duke");

    const includes = [];

    // Include Address if specified in includeModels
    if (includeModels.includes("Address")) {
      includes.push({
        model: Address,
        as: "addresses",
        attributes: [
          "city",
          "street_address",
          "address_line_2",
          "country",
          "district",
          "province",
          "postal_code",
        ],
        limit: 1,
      });
    }

    // Define the query options
    const queryOptions = {
      include: [
        {
          model: StockInstitutionRepresentative,
          as: "representatives",
          include: {
            model: StockCustomerPerson,
            as: "customerPerson",
          },
        },
        ...includes,
      ],
    };

    // Include attributes if specified
    if (attributes) {
      queryOptions.attributes = attributes; // Only fetch the specified attributes
    }

    // Execute the query
    const data = await StockCustomerInstitution.findAll(queryOptions);

    if (includeModels.includes("StockBillHeader")) {
      // Use `Promise.all` to ensure that async operations are resolved before proceeding
      await Promise.all(
        data.map(async (item) => {
          try {
            const insId = item.id;

            // Get the actual bill headers, not just the count
            const billHeaders = await StockBillHeader.findAll({
              where: {
                stock_customer_institution_id: insId,
                is_deleted: false,
              },
              attributes: ["created_at", "paid_status"], // Retrieve the created_at and paid_status
              order: [["created_at", "DESC"]], // Orders by created_at in descending order (latest first)
            });

            // If you want to get the count of paid bills, you can filter like this
            const paidBillsCount = billHeaders.filter(
              (b) => b.paid_status === true
            ).length;

            item.dataValues.billsCount = billHeaders?.length || 0;

            // Set the paidBillsCount on the item
            item.dataValues.paidBillsCount = paidBillsCount;

            // Get the last billing date, if there are any bills
            item.dataValues.lastBillingDate =
              billHeaders.length > 0 ? billHeaders[0].created_at : null;

            // Optionally log the paidBillsCount for debugging purposes
            console.log(
              `Paid Bills Count for Institution ID ${insId}: ${paidBillsCount}`
            );
          } catch (error) {
            console.error("Error fetching bill headers:", error);
          }
        })
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const getUniqueItemCodesForEachInstitutionQuery = async ({
  institutionIds = [],
}) => {
  const { StockBillHeader, StockBillDetail, StockCustomerInstitution } =
    setUpAssociations("pos_database_duke");

  try {
    // Fetch unique item codes for each stock_customer_institution_id
    const result = await StockBillHeader.findAll({
      attributes: [
        "stock_customer_institution_id",
        [
          Sequelize.fn(
            "ARRAY_AGG",
            Sequelize.fn("DISTINCT", Sequelize.col("billDetails.item_code"))
          ),
          "item_codes",
        ],
      ],
      include: [
        {
          model: StockBillDetail,
          as: "billDetails",
          attributes: [], // We only need item_code, so no other attributes are required
        },
        {
          model: StockCustomerInstitution,
          as: "customerInstitution",
          attributes: ["name", "location_url"],
        },
      ],
      group: [
        "StockBillHeader.stock_customer_institution_id",
        "customerInstitution.name",
        "customerInstitution.location_url",
      ],
      where: institutionIds.length
        ? { stock_customer_institution_id: institutionIds }
        : {},
      raw: true, // Ensures that we don't get unnecessary metadata
    });

    // Format the result into JSON format
    return result.map((row) => ({
      stock_customer_institution_id: row.stock_customer_institution_id,
      institution_name: row["customerInstitution.name"],
      location_url: row["customerInstitution.location_url"],
      item_codes: row.item_codes,
    }));
  } catch (error) {
    console.error(
      "Failed to get unique item codes for each institution",
      error
    );
    throw error;
  }
};

const getStockCustomerInstitutionByInstitutionIdQuery = async ({
  institutionId = null,
  includeAddresses = false,
}) => {
  try {
    if (!institutionId) {
      throw new Error("Invalid intitution id");
    }
    const { StockCustomerInstitution, Address } =
      setUpAssociations("pos_database_duke");

    const includeArray = [];

    if (includeAddresses) {
      includeArray.push({
        model: Address,
        as: "addresses",
      });
    }

    const response = await StockCustomerInstitution.findOne({
      where: {
        id: institutionId,
      },
      include: [
        ...includeArray, // Other includes if needed
      ],
    });

    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createStockCustomerInstitutionQuery,
  updateStockCustomerInstitutionQuery,
  getAllCustomerPersonsByCustomerInstitutionIdQuery,
  createOrUpdateListOfPersonsInCustomerInstitutionQuery,
  getStockCustomerInstitutionLogoFilePathQuery,
  stockCustomerInstitutionToggleDeletionQuery,
  getAllStockCustomerInstitutionsQuery,
  getUniqueItemCodesForEachInstitutionQuery,
  getStockCustomerInstitutionByInstitutionIdQuery,
};
