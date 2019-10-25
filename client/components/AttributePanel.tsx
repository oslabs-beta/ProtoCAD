import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addAttribute, setCurrentComponent } from "../actions/componentsAction";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalState } from '../utils/InterfaceDefinitions';


const useStyles = makeStyles(theme => ({
  input: {
     margin: theme.spacing(1),
    '&:after': {
     borderBottom: '2px solid #55b5e6',
   },
  },
}));


export default props => {

    const dispatch = useDispatch();
    const classes = useStyles({});

    const [attribute, setAttributes] = React.useState({
        name: '',
        type: 'String',
    });

    const selected = useSelector((state: GlobalState) => state.selected.data);

    const handleChange = (e) => {
        e.persist();
        setAttributes(oldValue => ({
            ...oldValue,
            [e.target.name]: e.target.value,
        }));
    };

    const onButtonClick = () => {
        const obj = {};
        obj[attribute.name] = attribute.type;
        dispatch(addAttribute(selected, obj));
        props.handleClose();
    };

    return (
        <div className="attribute-form">
            <Input
                className={classes.input}
                value={attribute.name}
                onChange={handleChange}
                placeholder="Name of Prop"
                name="name"
            >
            </Input>
            <Select
                className={classes.input}
                value={attribute.type}
                onChange={handleChange}
                inputProps={{
                    name: 'type',
                    id: 'type-label-placeholder',
                }}
                name="type"
            >
                <MenuItem value={'String'}>String</MenuItem>
                <MenuItem value={'Boolean'}>Boolean</MenuItem>
                <MenuItem value={'Int'}>Int</MenuItem>
                <MenuItem value={'Float'}>Float</MenuItem>
            </Select>
            <Button
                className="attribute-form-field button"
                onClick={onButtonClick}>
                Add Prop
            </Button>
        </div>
    )
};
