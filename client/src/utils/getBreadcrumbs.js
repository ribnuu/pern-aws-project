const routeTitleMap = {
  "/": "/",
  "/home": "Home",
  "/dev": "Development",
  "/register": "Register",
  "/login": "Login",
  "/profile-settings": "Profile Settings",
  "/about-us": "About Us",
  "/services": "Services",
  "/compliance": "Compliance",
  "/cloud-security": "Cloud Security",
  "/contact-us": "Contact Us",
  "/terms-and-conditions": "Terms and Conditions",
  "/refund-policy": "Refund Policy",
  "/awards": "Awards",
  "/careers": "Careers",
  "/solutions": "Solutions",
  "/pos/bln/:billNumber": "Bill Details",
  "/pos": "Point of Sales",

  // Hotel Gateway System Routes
  "/hgs": "Hotel Gateway System",
  "/hgs/reg": "Hotel Registration",
  "/hgs/mhs": "Manage Hotels",
  "/hgs/hls": "Hotels List",

  // House Holders List Routes
  "/hhl": "House Holders List",
  "/hhl/reg": "House Holders Registration",
  "/hhl/mng": "Manage House Holders List",

  // Payments Testing Routes
  "/hnb-payment-test": "HNB Payment Test",
  "/payment_confirmation": "Payment Confirmation",

  // External Routes
  externalMenu: "External Menu",
  cme: "Connection",
  dcm: "Connect",
  nse: "NSE",
  dre: "Requisition",
  cpm: "Character Rating",

  // Report Generating System Routes
  "/rgs": "Report Generating System",
  "/rgs/dss": "Daily Summary Screen",
  "/rgs/css": "Crime Summary Screen",
  "/rgs/pfu": "Police Force Update",
  "/rgs/travel-route-report": "Travel Route Report",
  "/rgs/tor": "Traffic Offense Report",
  "/val": "Validation",

  // Example Pages of PFU
  "/rgs/pfu/dehiwala": "Dehiwala PFU Example",
  "/rgs/pfu/wellawatte": "Wellawatte PFU Example",

  // Menu Routes
  omr: "Owner Mismatch Record",
  ntc: "Transport Commission Home",
  "ntc/create": "Transport Commission Registration",
  "ntc/view": "View Permit",
  ccn: "Citizen Code Number Menu",

  // CEO Route
  ceo: "Chief Executive Officer",

  // Driver Offense Portal Routes
  "/pop/dop": "Driver Offense Portal",
  "/pop/dop/ife": "Issue Fine",
  "/pop/dop/fod": "Fines On My Duty",
  "/pop/dop/lia": "License Actions",
  "/pop/dop/lid": "License In Hand",
  "/pop/dop/select": "Select",
  "/pop/arp": "Arrest Person",
  "/pop/dop/paymentOption": "Payment Option",
  "/dop/payment": "Payment",
  "/dop/issues-without-fine": "Issues Without Fine",
  "/dop/dps": "Driver Points System",

  // Shopping Portal Routes
  "/shp": "Shopping Portal",
  "/shp/1001": "Shop One",

  // Point of Sales Routes
  "/pos": "Point of Sales",
  "/pos/bln": "POS Billing Screen",
  "/pos/iin": "Item Information",
  "/pos/grn": "GRN Screen",
  "/pos/bpm": "Bill Payment Screen",
  "/pos/item-category-sub-category": "Item Category & Sub Category",
  "/pos/ins": "Institution Management",
  "/pos/pnl": "Profit & Loss Screen",
  "/pos/ecs": "Expenses Category & Sub Category",
  "/pos/eps": "Expenses Screen",
  "/pos/rsv": "Rep Sales Visit Screen",
  "/pos/asy": "Auto Sales System Screen",
  "/pos/irs": "Institution Representatives Screen",
  "/pos/tac": "Transactions Screen",
  "/pos/isa": "Institution Stock Activity Check",
  "/pos/ind": "Institutions",
  "/pos/mbl": "Manage Bills Screen",
  "/pos/cpe": "Customer Profile Screen",
  "/pos/rcs": "Rep Commissions Pay Screen",
};

// export function getBreadcrumbs(pathname) {
//   const breadcrumbs = [];
//   const pathSegments = pathname.split("/").filter((segment) => segment);

//   let cumulativePath = "";
//   pathSegments.forEach((segment) => {
//     cumulativePath += `/${segment}`;
//     const title = routeTitleMap[cumulativePath] || segment; // Fallback to segment if no title
//     breadcrumbs.push({ label: title, path: cumulativePath });
//   });
//   debugger;

//   return breadcrumbs;
// }

export function getBreadcrumbs(pathname) {
  const breadcrumbs = [];
  const pathSegments = pathname.split("/").filter((segment) => segment);

  let cumulativePath = "";
  pathSegments.forEach((segment) => {
    cumulativePath += `/${segment}`;

    // Check if the cumulativePath exists in routeTitleMap
    const title = routeTitleMap[cumulativePath];

    if (title) {
      breadcrumbs.push({ label: title, path: cumulativePath });
    } else {
      // Fallback to segment if no title is found
      breadcrumbs.push({ label: segment, path: cumulativePath });
    }
  });

  // Handle the case where there are no segments (i.e., the landing page "/")
  if (pathname === "/") {
    breadcrumbs.push({ label: routeTitleMap["/"] || "Home", path: "/" });
  }

  // Log the result for debugging
  console.log("Generated breadcrumbs: ", breadcrumbs);

  return breadcrumbs;
}
