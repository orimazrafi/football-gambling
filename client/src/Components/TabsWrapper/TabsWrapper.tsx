import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MatchesGamble } from "../MatchesGamble/MatchesGamble";

import { WinningTeam } from "../../Pages/WinningTeam/WinningTeam";
import { BestScorer } from "../../Pages/BestScorer/BestScorer";
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

interface Props {
  value: number;
  onTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}
export const TabsWrapper = (props: Props) => {
  const { value, onTabChange } = props;
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={onTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Best Scorer" {...a11yProps(0)} />
          <Tab label="Matches Result" {...a11yProps(1)} />
          <Tab label="Winning Team" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BestScorer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchesGamble />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WinningTeam />
      </TabPanel>
    </div>
  );
};
