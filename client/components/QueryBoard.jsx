import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

// renders queries from parent component (Editor)
export default props => {

  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true,
  });

  const onBeforeChange = (editor, data, value) => {
    props.setQuery(value);
  };

  return <CodeMirror value={props.query} onBeforeChange={onBeforeChange} options={option} />;
};
