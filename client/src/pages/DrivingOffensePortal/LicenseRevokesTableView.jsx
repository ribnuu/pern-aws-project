import React, { useState } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

const LicenseRevokesTableView = ({
  pastRecords,
  isLoadedPastRecords = true,
  isMobile,
  message,
}) => {
  const [openRecord, setOpenRecord] = useState(null); // Track the open record for mobile view

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
                      "License Number",
                      "Court ID",
                      "Court Case Number",
                      "Revoked By",
                      "From",
                      "To",
                      "Remarks",
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
                        {item.license_number}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.court_id}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.court_case_number}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.created_by}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {formatDatetime(item.created_at)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {formatDatetime(item.to_date)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.remarks || "N/A"}
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
                    {formatDatetime(item.to_date)}
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
                      <strong>License Number:</strong> {item.license_number}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Court ID:</strong> {item.court_id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Court Case Number:</strong>{" "}
                      {item.court_case_number}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Created By:</strong> {item.created_by}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Created At:</strong>{" "}
                      {formatDatetime(item.created_at)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Updated At:</strong>{" "}
                      {formatDatetime(item.updated_at)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Remarks:</strong> {item.remarks || "N/A"}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))
          )
        ) : (
          <Card className="p-4">
            <Typography>No Past Revokes Found</Typography>
          </Card>
        )
      ) : (
        <Box className="p-4">
          <Typography>
            {message
              ? message
              : "Enter the license number to load revokes history."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LicenseRevokesTableView;
