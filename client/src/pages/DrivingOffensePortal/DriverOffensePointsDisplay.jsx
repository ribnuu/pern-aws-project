import React from "react";
import { Box, Typography, Card, Grid } from "@mui/material";

const DriverOffensePointsDisplay = ({ driverOffensePointsData = null }) => {
  // Handle the case when driverOffensePointsData is null
  if (!driverOffensePointsData) {
    return (
      <Card className="p-4 mb-4 shadow-lg bg-red-50">
        <Typography variant="h6" className="text-red-600 font-semibold">
          No data available for this driver.
        </Typography>
      </Card>
    );
  }

  const dataEntries = [
    {
      label: "License Number",
      value: driverOffensePointsData.license_number || "N/A",
    },
    {
      label: "Total Points",
      value: driverOffensePointsData.total_points || "N/A",
    },
    {
      label: "Consumed Points",
      value: driverOffensePointsData.consumed_points || "N/A",
    },
    {
      label: "Balance Points",
      value: driverOffensePointsData.balance_points || "N/A",
    },
    {
      label: "Created At",
      value: driverOffensePointsData.createdAt
        ? new Date(driverOffensePointsData.createdAt).toLocaleString()
        : "N/A",
    },
    {
      label: "Updated At",
      value: driverOffensePointsData.updatedAt
        ? new Date(driverOffensePointsData.updatedAt).toLocaleString()
        : "N/A",
    },
  ];

  // return (
  //   <Card className="p-4 mb-4 shadow-lg bg-white">
  //     <Typography variant="h6" className="font-bold mb-4 text-center">
  //       Driver Points Summary
  //     </Typography>
  //     <Grid container spacing={2}>
  //       {dataEntries.map((entry, index) => (
  //         <Grid item xs={12} sm={6} key={index} className="py-2">
  //           <Box
  //             className="flex justify-between py-2 border-b border-gray-300"
  //             sx={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               padding: "8px",
  //               borderRadius: "8px",
  //               transition: "background-color 0.3s",
  //               "&:hover": {
  //                 backgroundColor: "#f0f0f0",
  //               },
  //             }}
  //           >
  //             <Typography variant="body1" className="font-medium text-gray-700">
  //               {entry.label}:
  //             </Typography>
  //             <Typography variant="body1" className="text-gray-900">
  //               {entry.value}
  //             </Typography>
  //           </Box>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Card>
  // );

  return (
    <Box
      className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-6"
      sx={{
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h5"
        className="font-bold mb-6 text-gray-800 text-center"
        sx={{ fontWeight: "600" }}
      >
        Driver Points Summary
      </Typography>
      {dataEntries && dataEntries.length > 0 ? (
        <Grid container spacing={3}>
          {dataEntries.map((entry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                className="py-4 px-5 bg-gray-50 hover:shadow-lg"
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  className="font-medium text-gray-600 mb-2"
                  sx={{ fontSize: "16px" }}
                >
                  {entry.label}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-gray-900 font-semibold"
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  {entry.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className="p-4 text-center">
          <Typography variant="body1" className="text-gray-700">
            No data available to display.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DriverOffensePointsDisplay;
