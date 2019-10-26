import * as React from 'react';

interface Props {
  fn: () => {};
  message: string;
}

export default (type: string, props: Props) => {
  switch (type) {
    case 'add':
      return <AddButton {...props} />;
    case 'remove':
      return <RemoveButton {...props} />;
    case 'edit':
      return <EditButton {...props} />;
    default:
      return <button className="defaultButton" onClick={props.fn}>{props.message}</button>;
  }
};

const AddButton = (props: Props) => (<button className="btn addBtn" onClick={props.fn}>Add Component</button>);

const RemoveButton = (props: Props) => (<button className="btn removeBtn" onClick={props.fn}>Remove Component</button>);

const EditButton = (props: Props) => (<button className="btn editButton" onClick={props.fn}>Edit Component</button>);
