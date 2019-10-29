import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAttribute } from '../actions/componentsAction';
import { GlobalState } from '../utils/InterfaceDefinitions';


interface Props {
  handleClose: () => void,
}

/**
 * ************************************
 *
 * @module  PropsList
 * @description Presentational component that list and renders component attributes
 *
 * ************************************
 */
export default (props: Props) => {
  const { handleClose } = props;
  const selected = useSelector((state: GlobalState) => state.selected.data);
  const dispatch = useDispatch();
  const { attributes } = selected;

  const onButtonClick = (key: string) => {
    dispatch(deleteAttribute(selected, key));
    handleClose();
  };

  return (
    <div>
      {
        Object.keys(attributes).map((key) => (
          <div className="attributeItem" key={key}>
            <div className="attributeName">{key}</div>
            {' '}
            :
            <div className="attributeType">{attributes[key]}</div>
            {key !== 'id' && (
            <button onClick={() => onButtonClick(key)}>-</button>
            )}
          </div>
        ))
      }
    </div>
  );
};
