import React from "react";
import {
  Typography,
  Box,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatDateToWords } from "../../../utils/dateUtils";

const FineDataDisplay = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        Offense Details
      </Typography>
      {isMobile && <Divider sx={{ mb: 2 }} />}
      <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Date:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {formatDateToWords(data.offense_date_time)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>License Number:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.license_number}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Vehicle Number:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.vehicle_number}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Mobile Number:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.mobile_number}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Offense:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.offense_name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Offense Amount:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.fine_amount}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          <Typography variant="body1" component="div" sx={{ width: 150 }}>
            <strong>Police Officer:</strong>
          </Typography>
          <Typography variant="body1" component="div">
            {data.officer_name}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};

export default FineDataDisplay;
