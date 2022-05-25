import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import WeatherMap from "../WeatherMap/WeatherMap";
import MoistureData from "../MoistureData/MoistureData";
import "./TabNav.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabNav({ temperature, humidity }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // console.log(temperature);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#26292e" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} className="tabName" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className="tab">
        <WeatherMap temperature={temperature} humidity={humidity} />
      </TabPanel>
      <TabPanel value={value} index={1} className="tab">
        <MoistureData />
      </TabPanel>
      {/* <TabPanel value={value} index={2} className="tab">
        <Earthquake />
      </TabPanel> */}
    </div>
  );
}

export default TabNav;
