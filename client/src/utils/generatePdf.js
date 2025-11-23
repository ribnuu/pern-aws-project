import html2pdf from "html2pdf.js";

export const convertToPDF = (elementId) => {
  const element = document.getElementById(elementId);
  const options = {
    margin: [10, 10], // Set margins (top, left, bottom, right)
    filename: "document.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(element).set(options).save();
};
