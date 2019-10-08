import React from 'react';

export default (type, props) => {
  switch (type) {
    case 'add':
      return <AddButton {...props} />;
    case 'remove':
      return <RemoveButton {...props} />;
    case 'edit':
      return <EditButton {...props} />;
    default:
      return <button className={'defaultButton'} onClick={props.fn}>{props.message}</button>;
  }
}

const AddButton = props => (<button className={'btn addBtn'} onClick={props.fn}>Add Component</button>);

const RemoveButton = props => (<button className={'btn removeBtn'} onClick={props.fn}>Remove Component</button>);

const EditButton = props => (<button className={'btn editButton'} onClick={props.fn}>Edit Component</button>);
