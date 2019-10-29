import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState, ComponentInt } from '../utils/InterfaceDefinitions';
import { deleteComponent, deleteAttribute, setCurrentComponent } from '../actions/componentsAction';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginLeft: '5px',
  },
}));

interface Props {
  item: ComponentInt,
  name: string,
  attributes?: {id: string}
}

/**
 * ************************************
 *
 * @module  EachPanel
 * @description
 *
 * ************************************
 */
const EachPanel = (props) => {
  const { item, name, attributes } = props;
  const classes = useStyles({});
  const current = useSelector((state: GlobalState) => state.current.data);

  const dispatch = useDispatch();

  const handleClick = (myItem: ComponentInt, key: string) => {
    dispatch(deleteAttribute(myItem, key));
  };

  const handleDelete = () => {
    dispatch(deleteComponent(item));
  };

  const openComponent = () => {
    dispatch(setCurrentComponent(item));
  };

  const customClass = () => (current.name === name ? 'currentOpen' : '');
  return (
    <ExpansionPanel className="eachPanel">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={customClass()}
        onClick={openComponent}
      >
        <Typography className={classes.heading}>{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="eachPanelDetail">
        {
          Object.keys(attributes).map((key) => (
            <div className="inline between" key={key}>
              <Typography key={key} className="panel_typography">
                {
                  `${key}: ${attributes[key]}`
                }
              </Typography>
              {
                key !== 'id' ? (
                  <IconButton
                    size="small"
                    onClick={() => handleClick(item, key)}
                    className={classes.button}
                  >
                    <RemoveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    disabled
                    onClick={() => handleClick(item, key)}
                    className={classes.button}
                  >
                    <RemoveIcon />
                  </IconButton>
                )
               }
            </div>
          ))
         }
        <Button
          className="button alert space up"
          variant="contained"
          size="small"
          id="exportButton"
          onClick={handleDelete}
        >
         Delete
        </Button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};


/**
 * ************************************
 *
 * @module  SimpleExpansionPanel
 * @description
 *
 * ************************************
 */
export default function SimpleExpansionPanel() {
  const classes = useStyles({});

  // components list
  const components = useSelector((state: GlobalState) => state.components.data);

  return (
    <div className={classes.root}>
      {
      components.map((item) => <EachPanel key={item.name} {...item} item={item} />)
    }
    </div>
  );
}
