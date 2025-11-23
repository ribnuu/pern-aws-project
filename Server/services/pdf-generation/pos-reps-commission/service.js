const dayjs = require("dayjs");
const PDFDocument = require("pdfkit-table");

const generatePdf = ({ data = {}, res = null, dateRange = "" }) => {
  // Set response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="bill-details.pdf"');
  const doc = new PDFDocument({ size: "A3", layout: "landscape", margin: 30 });
  const table = {
    title: `Paid transactions on: ${dateRange}`,
    // subtitle: dateRange,
    headers: [
      { label: "Bill Number", property: "name", width: 75, renderer: null },
      {
        label: "INSTITUTION",
        property: "institution",
        width: 150,
        renderer: null,
      },
      {
        label: "REP",
        property: "representative",
        width: 40,
        renderer: null,
      },
      {
        label: "CREATED AT",
        property: "ceted_at",
        width: 100,
        renderer: null,
      },
      {
        label: "PAID AT",
        property: "paid_at",
        width: 100,
        renderer: null,
      },
      {
        label: "STATUS",
        property: "paidStatus",
        width: 50,
        renderer: null,
      },
      {
        label: "GRAND TOT",
        property: "grandTotal",
        width: 50,
        renderer: null,
      },
      {
        label: "PAID AMT",
        property: "grandTotal",
        width: 50,
        renderer: null,
      },
      {
        label: "ITEM NAME",
        property: "itemName",
        width: 125,
        renderer: null,
      },
      {
        label: "ITEM CODE",
        property: "itemCode",
        width: 70,
        renderer: null,
      },
      {
        label: "COM",
        property: "commission",
        width: 40,
        renderer: null,
      },
      {
        label: "QTY",
        property: "quantity",
        width: 40,
        renderer: null,
      },
      {
        label: "TOTAL COM",
        property: "totalCommission",
        width: 40,
        renderer: null,
      },
      {
        label: "ACTION",
        property: "action",
        width: 175,
        renderer: (value, indexColumn, indexRow, row) => {
          if (!value?.isBillToCompany) {
            return "CUSTOMER BILL";
          }
          if (!value?.isComAvailable) {
            return "ADD COMMISSION";
          }
          if (value?.isCommissionPaid) {
            // return `PAID \n${dayjs(value?.commisPaidOn).format("MMMM D, YYYY h:mm A")}`;
            return `PAID \n${value?.commisPaidOn}`;
          } else {
            return "PENDING";
          }
        },
      },
    ],
    rows: data.data.map((element) => [
      element.bill_number,
      element?.header?.customerInstitution?.name,
      element?.header?.customerInstitution?.representatives &&
        element?.header?.customerInstitution?.representatives[0]?.customerPerson
          ?.name,
      dayjs(element?.header?.created_at).format("MMMM D, YYYY h:mm A"),
      dayjs(element?.header?.billPayDetail[0].created_at).format(
        "MMMM D, YYYY h:mm A"
      ),
      element?.header?.paid_status
        ? "PAID"
        : element?.header?.paid_amount > 0
          ? "PARTIAL"
          : "PENDING",
      element?.header?.grand_total,
      element?.header?.paid_amount,
      element?.itemHeader?.item_name,
      element?.item_code,
      element?.dataValues?.commission,
      element?.quantity?.toString(),
      element?.dataValues?.totalCommission,
      {
        isCommissionPaid: element?.dataValues?.isCommissionPaid,
        isComAvailable: element?.dataValues?.isComAvailable,
        commisPaidOn: element?.dataValues?.commisPaidOn,
        isBillToCompany: element.header.is_bill_to_company,
      },
    ]),
  };

  doc.pipe(res);

  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow) => {
      doc.font("Helvetica").fontSize(6);
      indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
    },
    minRowHeight: 25, // Adjust this value as needed
  });

  doc.end();
};

module.exports = {
  generatePdf,
};
