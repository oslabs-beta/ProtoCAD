import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentComponent } from '../actions/componentsAction';
import { ComponentInt, GlobalState } from '../utils/InterfaceDefinitions';
import Tree from './Tree';
import GQLBoard from "./GQLBoard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs() {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Schema" {...a11yProps(0)} />
            <Tab label="GQL" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Tree />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GQLBoard />
        </TabPanel>
      </div>
  );
}

/**
 * Dashboard Component
 *
 * Watches for freshly created components and changes the UI to target
 * specific component.
 */
export default () => {
  // collects all existing components data from redux store
  const components = useSelector((state: GlobalState) => state.components.data);
  // collects current component data from redux store
  const current = useSelector((state: GlobalState) => state.current.data);
  const dispatch = useDispatch();

  // watches for component updates
  React.useEffect(() => {
    const newComponent = components.filter((item: ComponentInt) => item.name === current.name);
    // if updated component exists, set it to the current component view
    if (newComponent.length > 0) dispatch(setCurrentComponent(newComponent[0]));
    else if (components.length > 0) {
      dispatch(setCurrentComponent(components[0]));
    } else {
      dispatch(setCurrentComponent({}));
    }
  }, [components]);


  return (
    <div id="dashboard">
      <SimpleTabs />
    </div>
  );
};
