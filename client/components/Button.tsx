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

const AddButton = (props: Props) => {
  const { fn } = props;
  return (<button className="btn addBtn" onClick={fn}>Add Component</button>);
};

const RemoveButton = (props: Props) => {
  const { fn } = props;
  return (<button className="btn removeBtn" onClick={fn}>Remove Component</button>);
};

const EditButton = (props: Props) => {
  const { fn } = props;
  return (<button className="btn editButton" onClick={fn}>Edit Component</button>);
};
