const dbDukeClient = require("../../config/dbDuke");

const getProfitAndLossDataQuery = async () => {
  try {
    const query = `
        WITH transactions AS (
            SELECT
                EXTRACT(YEAR FROM created_at) AS year,
                EXTRACT(MONTH FROM created_at) AS month,
                json_agg(json_build_object(
                    'id', id,
                    'created_at', created_at,
                    'cost', cost,
                    'mrp', mrp,
                    'qty', qty
                )) AS stock_transactions_updates
            FROM
                stock_transaction_update
            WHERE
                is_deleted = false
            GROUP BY
                EXTRACT(YEAR FROM created_at),
                EXTRACT(MONTH FROM created_at)
        ),
        expenses AS (
            SELECT
                EXTRACT(YEAR FROM h.expenses_date) AS year,
                EXTRACT(MONTH FROM h.expenses_date) AS month,
                json_agg(json_build_object(
                    'id', h.id,
                    'expenses_date', h.expenses_date,
                    'details', (
                        SELECT json_agg(json_build_object(
                            'id', d.id,
                            'amount', d.amount,
                            'fixed_asset', d.fixed_asset
                        ))
                        FROM expenses_detail d
                        WHERE d.expense_header_id = h.id
                    )
                )) AS stock_expenses
            FROM
                expenses_header h
            GROUP BY
                EXTRACT(YEAR FROM h.expenses_date),
                EXTRACT(MONTH FROM h.expenses_date)
        )
        SELECT
            COALESCE(t.year, e.year) AS year,
            COALESCE(t.month, e.month) AS month,
            COALESCE(t.stock_transactions_updates, '[]') AS stock_transactions_updates,
            COALESCE(e.stock_expenses, '[]') AS stock_expenses
        FROM
            transactions t
        FULL OUTER JOIN
            expenses e
        ON
            t.year = e.year AND t.month = e.month
        ORDER BY
            year, month;
    `;

    const data = await dbDukeClient.query(query);
    return data.rows;
  } catch (error) {
    throw error;
  }
};

const getProfitAndLossDUpdateataQuery = async () => {
  try {
    const query = `
WITH date_bounds AS (
  SELECT 
    MIN(DATE_TRUNC('year', min_date)) AS start_date,
    CURRENT_DATE AS end_date
  FROM (
    SELECT MIN(created_at) AS min_date FROM stock_transaction_update WHERE is_deleted = false
    UNION
    SELECT MIN(expenses_date) AS min_date FROM expenses_header
  ) d
),
all_dates AS (
  SELECT generate_series(start_date, end_date, interval '1 day')::date AS day
  FROM date_bounds
),
transactions AS (
  SELECT
    DATE(created_at) AS created_day,
    json_agg(json_build_object(
      'id', id,
      'created_at', created_at,
      'cost', cost,
      'mrp', mrp,
      'qty', qty
    )) AS stock_transactions_updates
  FROM stock_transaction_update
  WHERE is_deleted = false
  GROUP BY created_day
),
expenses AS (
  SELECT
    DATE(h.expenses_date) AS expenses_day,
    json_agg(json_build_object(
      'id', h.id,
      'expenses_date', h.expenses_date,
      'details', COALESCE((
        SELECT json_agg(json_build_object(
          'id', d.id,
          'amount', d.amount,
          'fixed_asset', d.fixed_asset,
          'expensesType', csh_inner.type
        ))
        FROM expenses_detail d
        LEFT JOIN expenses_cash_source_header csh_inner
          ON csh_inner.code = h.paid_from
        WHERE d.expense_header_id = h.id
      ), '[]'::json)
    )) AS stock_expenses
  FROM expenses_header h
  GROUP BY expenses_day
),
combined AS (
  SELECT
    EXTRACT(YEAR FROM d.day) AS year,
    EXTRACT(MONTH FROM d.day) AS month,
    EXTRACT(DAY FROM d.day) AS day,
    COALESCE(t.stock_transactions_updates, '[]'::json) AS stock_transactions_updates,
    COALESCE(e.stock_expenses, '[]'::json) AS stock_expenses
  FROM all_dates d
  LEFT JOIN transactions t ON t.created_day = d.day
  LEFT JOIN expenses e ON e.expenses_day = d.day
)
SELECT * FROM combined
ORDER BY year , month , day ;
                             `;

    const result = await dbDukeClient.query(query);
    return result.rows;
  } catch (error) {}
};

module.exports = {
  getProfitAndLossDataQuery,
  getProfitAndLossDUpdateataQuery,
};
