const fs = require("fs");
const path = require("path");

// const saveImage = async (rootFolderPath, fileName, imageData) => {
//   try {
//     // Remove header
//     const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

//     // Path to save image
//     const filePath = path.join(rootFolderPath, fileName);

//     // Save to server
//     await fs.writeFile(filePath, base64Data, "base64");
//     console.log("Image saved successfully");
//     return "Image saved successfully";
//   } catch (err) {
//     console.error("Error saving image:", err);
//     throw new Error("Error saving image");
//   }
// };

const saveImage = async (rootFolderPath, fileName, imageData) => {
  try {
    // Extract the file type from the Base64 string
    const mimeTypeMatch = imageData.match(
      /^data:image\/([a-zA-Z0-9-+\/]+);base64,/
    );
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
      throw new Error("Invalid Base64 image string");
    }
    const mimeType = mimeTypeMatch[1];

    // Map MIME types to file extensions
    const mimeToExtension = {
      png: "png",
      jpeg: "jpg",
      jpg: "jpg",
      gif: "gif",
      "svg+xml": "svg",
      // Add more MIME types if needed
    };

    // Determine file extension based on MIME type
    const extension = mimeToExtension[mimeType] || "bin";

    // Ensure fileName does not already have an extension
    const fileNameWithoutExtension = path.basename(
      fileName,
      path.extname(fileName)
    );
    const filePath = path.join(
      rootFolderPath,
      `${fileNameWithoutExtension}.${extension}`
    );

    // Remove the Base64 header
    const base64Data = imageData.replace(
      /^data:image\/[a-zA-Z0-9-+\/]+;base64,/,
      ""
    );

    // Save the image
    fs.writeFile(filePath, base64Data, "base64");
    console.log("Image saved successfully");

    // Return the file path
    return filePath;
  } catch (err) {
    console.error("Error saving image:", err);
    // throw new Error("Error saving image");
  }
};

const readImage = async (filePath) => {
  try {
    // Path to read image
    // const filePath = path.join(filePath);

    // Read the image file
    const data = fs.readFileSync(filePath, { encoding: "base64" });
    return `data:image/png;base64,${data}`;
  } catch (err) {
    console.error("Error reading image:", err);
    // throw new Error("Error reading image");
    return "";
  }
};

const extractFileType = (base64String) => {
  // Regular expression to match the MIME type part of the data URL
  const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,/);

  if (matches && matches[1]) {
    // Return the MIME type
    return matches[1];
  } else {
    // Handle cases where the Base64 string is not valid or does not match
    throw new Error("Invalid Base64 image string");
  }
};

const mimeToExtension = (mimeType) => {
  const mimeMap = {
    png: "png",
    jpeg: "jpg",
    jpg: "jpg",
    gif: "gif",
    "svg+xml": "svg",
  };
  return mimeMap[mimeType] || "bin";
};

module.exports = { saveImage, readImage, extractFileType, mimeToExtension };
