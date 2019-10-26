import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import SchemaBoard from './SchemaBoard.jsx';
import ResolverBoard from './ResolverBoard.jsx';
import QueryBoard from './QueryBoard';
import { GlobalState } from '../utils/InterfaceDefinitions';

declare const window: any;
const { ipcRenderer } = window;

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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default (props) => {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const directory = useSelector((state: GlobalState) => state.directory.data);
  const [schema, setSchema] = React.useState('');
  const [resolver, setResolver] = React.useState('const resolver = () => {\n\n}');
  const [query, setQuery] = React.useState('');

  const handleSchema = () => {
    if (schema.length > 0) ipcRenderer.send('schema', { path: directory.path, data: schema });
  };

  const handleResolver = () => {
    if (resolver.length > 0) ipcRenderer.send('resolver', { path: directory.path, data: resolver });
  };

  const handleQuery = () => {
    if (query.length > 0) ipcRenderer.send('query', { path: directory.path, data: query });
  };

  return (
    <div id="editor">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Schema" {...a11yProps(0)} />
            <Tab label="Resolver" {...a11yProps(1)} />
            <Tab label="Queries" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SchemaBoard schema={schema} setSchema={setSchema} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ResolverBoard resolver={resolver} setResolver={setResolver} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <QueryBoard query={query} setQuery={setQuery} />
        </TabPanel>
      </div>
      <div>
        <Button
          variant="contained"
          size="small"
          id="exportButton"
          onClick={handleSchema}
        >
                Send Schema
        </Button>
        <Button
          variant="contained"
          size="small"
          id="apollo"
          onClick={handleResolver}
        >
                Send Resolver
        </Button>
        <Button
          variant="contained"
          size="small"
          id="resolver"
          onClick={handleQuery}
        >
                Send Query
        </Button>
      </div>
    </div>
  );
};
