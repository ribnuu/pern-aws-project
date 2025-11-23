const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

async function checkWhitelistedRoutes(req, res, next) {
  try {
    const userId = req.headers["user_id"];
    const { CccWhitelistedRoutes } = setUpAssociationsCCC();

    // Remove this condition and add the relevant logic for has_path_paramters,
    // if path paramters available then alow the route, and make sure to change the where tpo check by wild char characters
    if (
      req.url.includes("/api/point-of-sales/bill") ||
      req.url.includes("/api/pdf-generation/pos/bill/")
    ) {
      next();
      return;
    }

    const response = await CccWhitelistedRoutes.findOne({
      where: {
        route: req.url,
      },
      attributes: ["id"],
    });

    // const response = await CccWhitelistedRoutes.findOne({
    //   where: {
    //     route: {
    //       [Op.startsWith]: req.url, // Match base route with any path parameters
    //     },
    //     has_path_parameters: true, // Ensure this flag is set if the route has path parameters
    //   },
    //   attributes: ["id"],
    // });

    // Allow thw whitelisted routes
    if (response) {
      next();
      return;
    }

    if (!userId) {
      console.error("USER ID IS NOT AVAILABLE FOR THIS REQUEST");
      return res.status(400).json({ error: "Malicious request detected" });
    }

    next();
  } catch (error) {
    console.error("Error in checkWhitelistedRoutes middleware:", error);
    return res.status(500).json({ message: "Failed to validate request" });
  }
}

module.exports = checkWhitelistedRoutes;

// const hasPathParameters = (url) => {
//   // Split the URL into segments
//   const segments = url.split("/").filter(Boolean); // Remove empty segments

//   // Check if any segment looks like a dynamic parameter
//   // For this case, we assume parameters are alphanumeric segments
//   return segments.some((segment) => /^[a-zA-Z0-9]+$/.test(segment));
// };

// async function checkWhitelistedRoutes(req, res, next) {
//   try {
//     const userId = req.headers["user_id"];
//     const { CccWhitelistedRoutes } = setUpAssociationsCCC();
//     const requestUrl = req.url.split("?")[0]; // Remove query parameters for base URL matching

//     // List of routes that can be accessed without whitelist check
//     // const publicRoutes = [
//     //   "/api/point-of-sales/bill",
//     //   "/api/pdf-generation/pos/bill/",
//     // ];

//     // // If the route is in the list of public routes, allow access
//     // if (publicRoutes.some((route) => requestUrl.startsWith(route))) {
//     //   next();
//     //   return;
//     // }

//     // Check if URL contains path parameters by looking for segments that are not static
//     const x = hasPathParameters(requestUrl);

//     // Query for routes with path parameters if the request URL has path parameters
//     // const response = await CccWhitelistedRoutes.findOne({
//     //   where: hasPathParameters
//     //     ? {
//     //         route: {
//     //           [Op.like]: `${requestUrl.split("/").slice(0, -1).join("/")}/%`, // Match base route with any path parameters
//     //         },
//     //         has_path_parameters: true,
//     //       }
//     //     : {
//     //         route: requestUrl,
//     //         has_path_parameters: false,
//     //       },
//     //   attributes: ["id"],
//     // });

//     const response = await CccWhitelistedRoutes.findOne({
//       where: {
//         route: {
//           [Op.like]: `${requestUrl.split("/").slice(0, -1).join("/")}/%`, // Match base route with any path parameters
//         },
//       },
//       attributes: ["id", "has_path_paramters"],
//     });

//     // Allow whitelisted routes
//     if (response) {
//       next();
//       return;
//     }

//     // Handle cases where user_id is missing
//     if (!userId) {
//       console.error("USER ID IS NOT AVAILABLE FOR THIS REQUEST");
//       return res.status(400).json({ error: "Malicious request detected" });
//     }

//     // If no whitelist match and user_id is present, proceed to the next middleware
//     next();
//   } catch (error) {
//     console.error("Error in checkWhitelistedRoutes middleware:", error);
//     return res.status(500).json({ message: "Failed to validate request" });
//   }
// }

// module.exports = checkWhitelistedRoutes;
