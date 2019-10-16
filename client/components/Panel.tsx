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

import {useDispatch, useSelector} from 'react-redux';
import {deleteComponent, setCurrentComponent} from "../actions/componentsAction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        button: {
            marginLeft: '5px'
        },
    }),
);

const EachPanel = props => {
    const classes = useStyles({});
    const current = useSelector(state => state.current.data);

    const dispatch = useDispatch();

    const handleClick = e => {

    };
    const handleDelete = e => {
        dispatch(deleteComponent(props.item));
    };
    const openComponent = () => {
       console.log('open component method called!') ;
       dispatch(setCurrentComponent(props.item));
    };
    const customClass = () => current.name === props.name ? 'currentOpen' : ''
    return (
        <ExpansionPanel className={'eachPanel'}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={customClass()}
            onClick={openComponent}
        >
            <Typography className={classes.heading}>{props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={'eachPanelDetail'}>
            {
                Object.keys(props.attributes).map((key, i) => {
                    return (
                        <div className={'inline between'} key={i}>
                            <Typography key={i} className={'panel_typography'}>
                                {
                                    `${key}: ${props.attributes[key]}`
                                }
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={handleClick}
                                className={classes.button}>
                                <RemoveIcon/>
                            </IconButton>
                        </div>
                    );
                })
            }
            <Button
                className={'button red space up'}
                variant="contained"
                size="small"
                id="exportButton"
                onClick={handleDelete}>
                Delete
            </Button>
        </ExpansionPanelDetails>
    </ExpansionPanel>);
};

export default function SimpleExpansionPanel() {
    const classes = useStyles({});

    // components list
    const components = useSelector(state => state.components.data);

    return (
        <div className={classes.root}>
            {
                components.map((item, i) => <EachPanel key={i} {...item} item={item} />)
            }
        </div>
    );
}
