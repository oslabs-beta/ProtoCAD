import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import ComponentPanel from './ComponentPanel';
import AttributePanel from './AttributePanel';
import { GlobalState } from '../utils/InterfaceDefinitions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    maxHeight: 600,
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
    padding: theme.spacing(1, 2, 1.5),
  },
}));

interface Props {
  open: boolean,
  handleClose: () => void,
  y: string,
  x: string
}

export default (props: Props) => {
  const {
    open,
    handleClose,
    y,
    x,
  } = props;
  const components = useSelector((state: GlobalState) => state.components.data);
  const classes = useStyles({});

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div
        style={{
          top: `${y}px`,
          left: `${x}px`,
        }}
        className={classes.paper}
      >
        {components.length > 1
                  && (
                  <div id="componentList">
                    <h4 id="simple-modal-title">Your Library</h4>
                    <hr />
                    <ComponentPanel modal handleClose={handleClose} />
                  </div>
                  )}
        <div id="propsContainer">
          <AttributePanel modal handleClose={handleClose} />
        </div>
      </div>
    </Modal>
  );
};
