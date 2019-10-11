import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addAttribute } from "../actions/componentsAction";
import { difference } from 'lodash';

export default props => {

  const dispatch = useDispatch();

  const [attribute, setAttributes] = React.useState({
    name: '',
    type: 'String',
  });

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
     dispatch(addAttribute(props.selectedNode, obj));
     props.handleClose();
   }

   return (
    <div>
      <Input
         value={attribute.name}
         onChange={handleChange}
         placeholder="Name of Prop"
         name="name"
      >
      </Input>
      <Select
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
      <button onClick={onButtonClick}>+</button>
    </div>
  )
};
