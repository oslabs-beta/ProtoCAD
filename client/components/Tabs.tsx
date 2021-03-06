import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tools from './Tools';
import Project from './Project';

/**
 * ************************************
 *
 * @module SimpleTabs
 * @description Functional component that displays tabs for the component list or file structure
 *
 * ************************************
 */
export default function SimpleTabs() {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  // Changes visible TabPanel component based on Tab label's value
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} id="tabs">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Tools" {...a11yProps(0)} />
          <Tab label="Project" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Tools />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Project />
      </TabPanel>
    </div>
  );
}

// Sets id selectors with given index and styles for material-ui Tabs component
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * ************************************
 *
 * @module  TabsPanel
 * @description Component that display content of a single tab
 * For this project, the tab shows the list of components or folder structure
 *
 * ************************************
 */
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
