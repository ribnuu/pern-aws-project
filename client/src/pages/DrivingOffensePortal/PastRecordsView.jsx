import React, { useState } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const PastRecordsView = ({
  pastRecords,
  isLoadedPastRecords,
  isMobile,
  message,
}) => {
  const [openRecord, setOpenRecord] = useState(null); // Track the open record

  // Toggle the visibility of the record details for mobile view
  const toggleRecord = (index) => {
    setOpenRecord((prev) => (prev === index ? null : index));
  };

  const formatDatetime = (datetimeString) => {
    const datetime = new Date(datetimeString);
    return datetime.toLocaleString();
  };

  return (
    <Box className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg">
      {isLoadedPastRecords ? (
        pastRecords && pastRecords.length > 0 ? (
          !isMobile ? (
            // Desktop view
            <Box className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    {[
                      "Date Time",
                      // "Activities",
                      "Vehicle Number",
                      "Police Station",
                      "Points",
                      // "Balance",
                      "Police Officer",
                      "Latitude",
                      "Longitude",
                      "Court Date",
                      "Location",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastRecords.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {formatDatetime(item.offense_date_time)}
                      </td>
                      {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.event}
                      </td> */}
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.vehicle_number}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item?.policeStation?.police_station_name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.points}
                      </td>
                      {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.totalPoints}
                      </td> */}
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.police_officer_id}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.latitude}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.longitude}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.courts_date}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
                              "_blank",
                              "noopener noreferrer"
                            )
                          }
                        >
                          View Location
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ) : (
            // Mobile view
            pastRecords.map((item, index) => (
              <Box key={index} className="border-b border-gray-200">
                <Box
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() => toggleRecord(index)}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 16px",
                    backgroundColor:
                      openRecord === index ? "#f9f9f9" : "#ffffff",
                    borderRadius: "8px",
                    transition: "background-color 0.3s",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    {formatDatetime(item.offense_date_time)}
                  </Typography>
                  {openRecord === index ? (
                    <FaChevronCircleUp className="text-gray-600" size={24} />
                  ) : (
                    <FaChevronCircleDown className="text-gray-600" size={24} />
                  )}
                </Box>
                {openRecord === index && (
                  <Box className="bg-gray-100 px-4 py-3">
                    <Typography variant="body2">
                      <strong>Vehicle Number:</strong> {item.vehicle_number}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Points:</strong> {item.points}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Police Officer:</strong> {item.police_officer_id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Latitude:</strong> {item.latitude}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Longitude:</strong> {item.longitude}
                    </Typography>
                    {item?.courts_date && (
                      <Typography variant="body2">
                        <strong>Court Date:</strong> {item.courts_date}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      <strong>Station:</strong>{" "}
                      {item?.policeStation?.police_station_name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
                          "_blank",
                          "noopener noreferrer"
                        )
                      }
                      sx={{ marginTop: "8px", width: "100%" }} // Make button full width for mobile
                    >
                      View Location
                    </Button>
                  </Box>
                )}
              </Box>
            ))
          )
        ) : (
          <Card className="p-4">
            <Typography>No Past Records Available</Typography>
          </Card>
        )
      ) : (
        <Box className="p-4">
          <Typography>
            {message
              ? message
              : "Enter driver's license number to load past records"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PastRecordsView;
