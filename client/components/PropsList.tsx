import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAttribute } from "../actions/componentsAction";

export default props => {

   const selected = useSelector(state => state.selected.data);
   const dispatch = useDispatch();
   const attributes = selected.attributes;

   const onButtonClick = (key) => {
     dispatch(deleteAttribute(selected, key));
     props.handleClose();
   };

   return (
    <div>
      {
        Object.keys(attributes).map((key, i) => {
          return (
            <div className="attributeItem" key={i}>
              <div className='attributeName'>{key}</div> :
              <div className='attributeType'>{attributes[key]}</div>
              {key !== 'id' && (
                <button onClick={() => onButtonClick(key)}>-</button>
              )}
            </div>
            )
        })
      }
    </div>
  )
};
