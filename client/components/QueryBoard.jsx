import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

export default props => {

  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true,
  });

  const onChange = (editor, data, value) => {

  };

  const onBeforeChange = (editor, data, value) => {
    props.setQuery(value);
    // dispatch(setResolverCode(value));
  };

  return <CodeMirror value={props.query} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />;
};
