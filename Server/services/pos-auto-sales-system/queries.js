const dbDukeClient = require("../../config/dbDuke");

const getBillDetailByCreatedAtFilteringQuery = async ({
  date_filter_val,
  stock_cus_ins_id,
  stock_cus_person_id,
  item_code,
}) => {
  try {
    const query = `
        SELECT
            h.bill_number,
            h.created_at,
            h.stock_customer_institution_id,
            h.stock_customer_person_id,
            d.item_code,
            d.quantity
        FROM
            stock_bill_header h
        JOIN
            stock_bill_detail d
        ON
            h.bill_number = d.bill_number
        WHERE
            h.created_at > $1
            AND h.stock_customer_institution_id = $2
            AND h.stock_customer_person_id = $3
            AND d.item_code = $4;

        `;

    const values = [
      date_filter_val,
      stock_cus_ins_id,
      stock_cus_person_id,
      item_code,
    ];
    const result = await dbDukeClient.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getFirstBillsForEachInstitutionQuery = async () => {
  try {
    // const query = `
    //   WITH item_details AS (
    //       SELECT
    //           h.stock_customer_institution_id,
    //           h.stock_customer_person_id,
    //           d.item_code,
    //           d.quantity,
    //           h.created_at AS bill_date
    //       FROM
    //           stock_bill_header h
    //       JOIN
    //           stock_bill_detail d
    //       ON
    //           h.bill_number = d.bill_number
    //   ),
    //   customer_details AS (
    //       SELECT
    //           COALESCE(d.stock_customer_institution_id, d.stock_customer_person_id) AS customer_id,
    //           COALESCE(i.name, p.name) AS customer_name,
    //           d.item_code,
    //           SUM(d.quantity) AS total_quantity,
    //           MIN(d.bill_date) AS first_bill_date,
    //           MAX(d.bill_date) AS last_bill_date
    //       FROM
    //           item_details d
    //       LEFT JOIN
    //           stock_customer_institution i
    //       ON
    //           d.stock_customer_institution_id = i.id
    //       LEFT JOIN
    //           stock_customer_person p
    //       ON
    //           d.stock_customer_person_id = p.id
    //       GROUP BY
    //           COALESCE(d.stock_customer_institution_id, d.stock_customer_person_id),
    //           d.item_code,
    //           COALESCE(i.name, p.name)
    //   ),
    //   latest_reps_visit AS (
    //       SELECT
    //           rv.item_code,
    //           rv.stock,
    //           rv.created_at,
    //           rv.stock_customer_institution_id,
    //           ROW_NUMBER() OVER (
    //               PARTITION BY rv.stock_customer_institution_id, rv.item_code
    //               ORDER BY rv.created_at DESC
    //           ) AS rn
    //       FROM
    //           stock_reps_visit rv
    //   )
    //   SELECT
    //       cd.customer_id,
    //       cd.customer_name,
    //       cd.item_code,
    //       cd.total_quantity,
    //       cd.first_bill_date,
    //       cd.last_bill_date,
    //       lr.stock AS latest_stock,
    //       lr.created_at AS latest_visit_date
    //   FROM
    //       customer_details cd
    //   LEFT JOIN
    //       latest_reps_visit lr
    //   ON
    //       cd.customer_id = lr.stock_customer_institution_id
    //       AND cd.item_code = lr.item_code
    //       AND lr.rn = 1
    //   ORDER BY
    //       cd.customer_id,
    //       cd.item_code;
    // `;
    const query = `
        WITH item_details AS (
            SELECT
                h.stock_customer_institution_id,
                h.stock_customer_person_id,
                d.item_code,
                d.quantity,
                h.created_at AS bill_date
            FROM
                stock_bill_header h
            JOIN
                stock_bill_detail d
            ON
                h.bill_number = d.bill_number
        ),
        customer_details AS (
            SELECT
                d.stock_customer_institution_id,
                d.stock_customer_person_id,
                COALESCE(d.stock_customer_institution_id, d.stock_customer_person_id) AS customer_id,
                COALESCE(i.name, p.name) AS customer_name,
                d.item_code,
                SUM(d.quantity) AS total_quantity,
                MIN(d.bill_date) AS first_bill_date,
                MAX(d.bill_date) AS last_bill_date
            FROM
                item_details d
            LEFT JOIN
                stock_customer_institution i
            ON
                d.stock_customer_institution_id = i.id
            LEFT JOIN
                stock_customer_person p
            ON
                d.stock_customer_person_id = p.id
            GROUP BY
                d.stock_customer_institution_id,
                d.stock_customer_person_id,
                d.item_code,
                COALESCE(i.name, p.name)
        ),
        latest_reps_visit AS (
            SELECT
                rv.item_code,
                rv.stock,
                rv.created_at,
                rv.stock_customer_institution_id,
                ROW_NUMBER() OVER (
                    PARTITION BY rv.stock_customer_institution_id, rv.item_code
                    ORDER BY rv.created_at DESC
                ) AS rn
            FROM
                stock_reps_visit rv
        )
        SELECT
            cd.stock_customer_institution_id,
            cd.stock_customer_person_id,
            cd.customer_id,
            cd.customer_name,
            cd.item_code,
            cd.total_quantity,
            cd.first_bill_date,
            cd.last_bill_date,
            lr.stock AS latest_stock,
            lr.created_at AS latest_visit_date
        FROM
            customer_details cd
        LEFT JOIN
            latest_reps_visit lr
        ON
            cd.stock_customer_institution_id = lr.stock_customer_institution_id
            AND cd.item_code = lr.item_code
            AND lr.rn = 1
        ORDER BY
            cd.stock_customer_institution_id,
            cd.stock_customer_person_id,
            cd.item_code;
        `;

    const result = await dbDukeClient.query(query);

    return result.rows;
  } catch (error) {
    console.error(
      "Failed @ getFirstAndLastBillsForEachInstitutionQuery",
      error
    );
    throw error;
  } finally {
    // Release the client if using a connection pool
    // client.release();
  }
};

module.exports = {
  getFirstBillsForEachInstitutionQuery,
  getBillDetailByCreatedAtFilteringQuery,
};
