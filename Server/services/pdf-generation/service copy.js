const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const pointOfSalesQueries = require("../pointOfSales/pointOfSalesQueries");

const logoData = path.join(
  "C:\\ccc\\DataStore\\CompanyLogos\\3b1971f1-5316-4126-aa99-b16e60ef25bd.jpg" // Update this path
);

function createInvoice(invoice, res) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  let isFirstPage = true; // Flag to check if it's the first page
  res.setHeader("Content-disposition", 'attachment; filename="output.pdf"');
  res.setHeader("Content-type", "application/pdf");

  // Add header and footer
  function addPage() {
    if (!isFirstPage) {
      doc.addPage();
    }
    generateHeader(doc); // Ensure header is on every page
    generateFooter(doc); // Ensure footer is on every page
    isFirstPage = false; // After the first page, don't need to check for it
  }

  // Add first page
  addPage();
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice, addPage);

  doc.end();
  doc.pipe(res);
}

function generateHeader(doc) {
  doc
    .image(logoData, 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("DUKE SUPER MARKET", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(invoice.createdAt), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.balanceDue),
      // formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice, addNewPage) {
  const pageHeight = doc.page.height;
  const margin = 50;
  const tableTop = 330; // Starting position for the table
  let currentPosition = tableTop;

  // Generate table headers
  function generateTableHeader() {
    generateTableRow(
      doc,
      currentPosition,
      "Item",
      "Description",
      "Unit Cost",
      "Quantity",
      "Line Total"
    );
    generateHr(doc, currentPosition + 20);
    doc.font("Helvetica");
    currentPosition += 30; // Add space for headers
  }

  generateTableHeader(); // Generate table headers on the first page

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    if (currentPosition + 30 > pageHeight - margin) {
      addNewPage(); // Start a new page if there's not enough space
      currentPosition = tableTop; // Reset position for new page
      generateTableHeader(); // Re-generate table headers on the new page
    }
    generateTableRow(
      doc,
      currentPosition,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );
    generateHr(doc, currentPosition + 20);
    currentPosition += 30; // Move to next row
  }

  // Add totals
  const subtotalPosition = currentPosition;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

// function generateFooter(doc) {
//   const pageHeight = doc.page.height;
//   const margin = 50;
//   const footerHeight = 20;

//   // Generate footer content
//   doc
//     .fontSize(10)
//     .text(
//       "Payment is due within 15 days. Thank you for your business.",
//       50,
//       pageHeight - margin - footerHeight,
//       { align: "center", width: 500 }
//     );
// }

function generateFooter(doc) {
  const pageWidth = doc.page.width;
  const margin = 50;
  const footerHeight = 20;

  // Footer content
  const footerText = "Thank You | Shop Again | © Copyrights Duke Super Market";

  // Generate footer content
  doc
    .fontSize(10)
    .text(footerText, margin, doc.page.height - margin - footerHeight, {
      align: "center",
      width: pageWidth - 2 * margin,
    });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 460, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + cents.toFixed(2);
}

function formatDate(isoDateString) {
  // Create a Date object from the ISO 8601 string
  const date = new Date(isoDateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Format as YYYY/MM/DD
  return `${year}/${month}/${day}`;
}

const generateBillPdfByBillNumberService = async (
  res,
  companyInformation = {
    name: "Company Name",
    phone_one: "123-456-7890",
    phone_two: "098-765-4321",
    email: "contact@company.com",
    website: "www.company.com",
  },
  branchInformation = { name: "Branch Name" },
  billNumber,
  stockBillHeader = {
    created_at: new Date(), // Ensure this is a Date object
    customer_name: "John Doe",
    customer_number: "CUS-001",
  }
) => {
  const billData =
    await pointOfSalesQueries.generateBillByBillNumberQuery(billNumber);

  console.log(billData);

  try {
    const invoice = {
      shipping: {
        name: billData.header.header.customer_name,
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111,
      },
      items: [
        {
          item: "TC 100",
          description: "Toner Cartridge",
          quantity: 2,
          amount: 6000,
        },
        {
          item: "USB_EXT",
          description: "USB Cable Extender",
          quantity: 1,
          amount: 2000,
        },
        // Add more items as needed
      ],
      subtotal: 8000,
      paid: 0,
      invoice_nr: billNumber,
      createdAt: billData.header.header.created_at,
      balanceDue: billData.header.header.balance_amount,
    };

    createInvoice(invoice, res);
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    throw error;
  }
};

module.exports = {
  generateBillPdfByBillNumberService,
};
