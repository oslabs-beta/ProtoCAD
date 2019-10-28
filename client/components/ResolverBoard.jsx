import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

// renders resolver from parent component (Editor)
export default props => {
  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true,
  });

  const onBeforeChange = (editor, data, value) => {
    props.setResolver(value);
  };

  return <CodeMirror value={props.resolver} onBeforeChange={onBeforeChange} options={option} />;
};
