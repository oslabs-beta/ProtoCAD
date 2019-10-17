import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import ComponentPanel from "./ComponentPanel";
import AttributePanel from "./AttributePanel";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        maxHeight: 600,
        backgroundColor: theme.palette.background.paper,
        overflow: 'scroll',
        padding: theme.spacing(1, 2, 1.5),
    },
}));

export default props => {

    const components = useSelector(state => state.components.data);
    const classes = useStyles();

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
          <div style={{
              top: `${props.y}px`,
              left: `${props.x}px`
          }} className={classes.paper}>
                {components.length > 1 &&
                  <div id="componentList">
                    <h4 id="simple-modal-title">Your Library</h4>
                    <hr />
                    <ComponentPanel modal={true} handleClose={props.handleClose} />
                  </div>
                }
              <div id="propsContainer">
                <h4 id="simple-modal-title">Add Prop</h4>
                <hr />
                <AttributePanel modal={true} handleClose={props.handleClose} />
              </div>
          </div>
      </Modal>
    );
}
