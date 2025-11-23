// // src/components/TextSwitch.jsx
// import React from 'react';
// import { styled } from '@mui/system';
// import Switch from '@mui/material/Switch';
// import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';

// const CustomSwitch = styled(Switch)(({ theme }) => ({
//   width: 58,
//   height: 34,
//   padding: 0,
//   display: 'flex',
//   '& .MuiSwitch-switchBase': {
//     padding: 2,
//     '&.Mui-checked': {
//       transform: 'translateX(24px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxSizing: 'border-box',
//     width: 30,
//     height: 30,
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 34 / 2,
//     opacity: 1,
//     backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA',
//     boxSizing: 'border-box',
//   },
// }));

// const TextSwitch = ({ checked, onChange, text }) => {
//   return (
//     <FormControlLabel
//       control={
//         <CustomSwitch
//           checked={checked}
//           onChange={onChange}
//         />
//       }
//       label={<Typography fontSize={22} color='grey' sx={{ mr: 2 }}>{text}</Typography>} // Add margin-right to the label
//       labelPlacement="start"
//     />
//   );
// };

// export default TextSwitch;

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TextSwitch() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab  label="Mobile Number" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
