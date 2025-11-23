// Required modules
const PDFDocument = require("pdfkit");
const path = require("path");
const pointOfSalesQueries = require("../pointOfSales/pointOfSalesQueries");

const logoData = path.join(
  "C:\\ccc\\DataStore\\CompanyLogos\\thisisdukesupmarketid.jpg"
);

function createInvoice(invoice, res) {
  const doc = new PDFDocument({ size: "A4", margin: 30 });
  let isFirstPage = true;

  res.setHeader("Content-disposition", 'attachment; filename="output.pdf"');
  res.setHeader("Content-type", "application/pdf");
  doc.pipe(res); // Pipe before ending the document

  function addPage() {
    if (!isFirstPage) {
      doc.addPage();
    }
    generateHeader(doc, invoice);
    generateNotesBox(doc);
    generateFooter(doc, invoice.company.name, invoice.company.website);
    isFirstPage = false;
  }

  addPage();
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice, addPage);

  doc.end();
}

function generateHeader(doc, invoice) {
  doc
    .image(logoData, 50, 25, { width: 150 })
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(invoice.company.name, 200, 30, { align: "right" });

  doc.font("Helvetica");
  const addressLines = invoice.company.address.split("\n");
  const addressTextHeight = addressLines.reduce(
    (height, line) => height + doc.heightOfString(line, { width: 250 }),
    0
  );

  const addressY = 45;
  const addressLineSpacing = 2;

  addressLines.forEach((line, index) => {
    if (line.trim()) {
      doc.text(
        line,
        200,
        addressY +
          index *
            (doc.heightOfString(line, { width: 250 }) + addressLineSpacing),
        { align: "right" }
      );
    }
  });

  const contactInfoY = addressY + addressTextHeight + 10;
  const rightEdge = 490;
  const labelX = rightEdge - 100;
  const colonX = rightEdge - 40;
  const valueX = rightEdge;
  const lineSpacing = 15;

  doc
    .fontSize(10)
    .text(`Hotline`, labelX, contactInfoY)
    .text(`:`, colonX, contactInfoY)
    .text(`${invoice.company.phone_two}`, valueX, contactInfoY, {
      align: "right",
    })
    .text(`Mobile`, labelX, contactInfoY + lineSpacing)
    .text(`:`, colonX, contactInfoY + lineSpacing)
    .text(`${invoice.company.phone_one}`, valueX, contactInfoY + lineSpacing, {
      align: "right",
    })
    .text(`Email`, labelX, contactInfoY + 2 * lineSpacing)
    .text(`:`, colonX, contactInfoY + 2 * lineSpacing)
    .text(`${invoice.company.email}`, valueX, contactInfoY + 2 * lineSpacing, {
      align: "right",
    })
    .text(`Website`, labelX, contactInfoY + 3 * lineSpacing)
    .text(`:`, colonX, contactInfoY + 3 * lineSpacing)
    .text(
      `${invoice.company.website}`,
      valueX,
      contactInfoY + 3 * lineSpacing,
      { align: "right" }
    );

  doc.moveDown();
}

function generateCustomerInformation(doc, invoice) {
  generateHr(doc, 190);
  doc.fillColor("#444444").fontSize(20).text("INVOICE", 50, 197);
  generateHr(doc, 217);

  const y = 225;
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, y)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, y)
    .font("Helvetica")
    .text("Invoice Date:", 50, y + 15)
    .text(formatDate(invoice.createdAt), 150, y + 15)
    .text("Payment Status:", 50, y + 30)
    .fillColor(invoice.paidStatus ? "blue" : "red")
    .text(invoice.paidStatus ? "PAID" : "UNPAID", 150, y + 30)
    .fillColor("black")
    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, y)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, y + 15)
    .text(
      `${invoice.shipping.repName}, ${invoice.shipping.refMobileNo}`,
      300,
      y + 30
    )
    .moveDown();

  generateHr(doc, 270);
}

function generateInvoiceTable(doc, invoice, addNewPage) {
  const pageHeight = doc.page.height;
  const margin = 50;
  const tableTop = 318;
  let y = tableTop;

  function generateTableHeader() {
    generateTableRow(
      doc,
      y,
      "ITEM CODE",
      "DESCRIPTION",
      "RATE",
      "QUANTITY",
      "TOTAL",
      true
    );
    generateHr(doc, y + 15);
    doc.font("Helvetica");
    y += 30;
  }

  generateHr(doc, 310);
  generateTableHeader();

  for (const item of invoice.bill_items) {
    if (y + 30 > pageHeight - margin - 100) {
      addNewPage();
      y = tableTop;
      generateTableHeader();
    }
    generateTableRow(
      doc,
      y,
      item.stock_item_header.item_code,
      item.stock_item_header.item_name,
      formatCurrency(item.stock_bill_detail.mrp),
      item.stock_bill_detail.quantity,
      formatCurrency(
        item.stock_bill_detail.mrp * item.stock_bill_detail.quantity
      ),
      false,
      9
    );
    generateHr(doc, y + 20);
    y += 30;
  }

  // Totals
  y += 10;
  generateTableRow(
    doc,
    y,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );
  y += 20;
  generateTableRow(
    doc,
    y,
    "",
    "",
    "Discount Amount",
    "",
    formatCurrency(invoice.discountAmount)
  );
  y += 20;
  generateTableRow(
    doc,
    y,
    "",
    "",
    "Discount %",
    "",
    `${invoice.discountPercentage.toFixed(2)} %`
  );
  y += 20;
  generateTableRow(
    doc,
    y,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );
  y += 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    y,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid),
    true
  );
  doc.font("Helvetica");
}

function generateFooter(doc, companyName, companyWebsite) {
  const pageWidth = doc.page.width;
  const margin = 30;
  const lineHeight = 12;
  const footerLines = [
    `Thank You for Your Business!`,
    companyWebsite ? `Shop Again | Visit Us: ${companyWebsite}` : `Shop Again`,
    `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
  ];

  doc.fontSize(8).font("Helvetica");
  const footerY = doc.page.height - margin - footerLines.length * lineHeight;

  footerLines.forEach((line, index) => {
    doc.text(line, margin, footerY + index * lineHeight, {
      align: "center",
      width: pageWidth - 2 * margin,
    });
  });
}

function generateNotesBox(doc) {
  const leftMargin = 50;
  const rightMargin = doc.page.width - 25;
  const lineHeight = 10;
  const topPadding = 3;
  const bottomPadding = 5;
  const bulletPoint = "• ";
  const borderRadius = 2;

  const lines = [
    "Keep the damaged products at the prescribed temperature...",
    "Inform us as soon as you discover the damaged product...",
    "Payments to be prepared as a cheque...",
    "Contact us for orders, compliments, complaints...",
  ];

  doc.fontSize(7.5).font("Helvetica");
  const contentHeight = lines.length * lineHeight;
  const footerY = doc.page.height - 80 - contentHeight - bottomPadding;
  const boxWidth = rightMargin - leftMargin;
  const boxHeight = contentHeight + topPadding + bottomPadding;

  doc
    .roundedRect(
      leftMargin,
      footerY - topPadding,
      boxWidth,
      boxHeight,
      borderRadius
    )
    .stroke("#aaaaaa");

  lines.forEach((line, index) => {
    doc.text(
      bulletPoint + line,
      leftMargin + topPadding,
      footerY + index * lineHeight + topPadding,
      {
        align: "left",
        width: boxWidth - 2 * topPadding,
      }
    );
  });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal,
  isTitle = false,
  fontSize = 9
) {
  doc.font(isTitle ? "Helvetica-Bold" : "Helvetica").fontSize(fontSize);
  doc
    .text(item, 50, y)
    .text(description, 115, y)
    .text(unitCost, 300, y, { width: 120, align: "right" })
    .text(quantity, 370, y, { width: 120, align: "right" })
    .text(lineTotal, 480, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(570, y).stroke();
}

function formatCurrency(value) {
  return "LKR " + value.toFixed(2);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

const generateBillPdfByBillNumberService = async (res, billNumber) => {
  try {
    const billData =
      await pointOfSalesQueries.generateBillByBillNumberQuery(billNumber);
    const invoice = {
      company: {
        name: billData.company_information.name,
        address: billData.company_information.address,
        phone_one: billData.company_information.phone_one,
        phone_two: billData.company_information.phone_two,
        email: billData.company_information.email,
        website: billData.company_information.website,
      },
      shipping: {
        name: billData.stock_customer_institution?.stock_customer_institution
          ?.name,
        address:
          billData.stock_customer_institution?.stock_customer_institution
            ?.address,
        repName: billData.stock_customer_person?.stock_customer_person?.name,
        refMobileNo:
          billData.stock_customer_person?.stock_customer_person?.mobile_number,
      },
      bill_items: billData.details,
      total: billData.header.header.total,
      discountAmount: billData.header.header.discount_amount || 0,
      discountPercentage: billData.header.header.discount_percentage || 0,
      subtotal: billData.header.header.grand_total,
      paid: billData.header.header.paid_amount,
      invoice_nr: billNumber,
      createdAt: billData.header.header.created_at,
      balanceDue: billData.header.header.balance_amount,
      paidStatus: billData.header.header.paid_status,
    };
    createInvoice(invoice, res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};

module.exports = {
  generateBillPdfByBillNumberService,
};
