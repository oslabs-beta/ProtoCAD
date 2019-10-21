import * as React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'

const ipcRenderer = window.ipcRenderer;

const Editor = props => {
  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true
  });


  const onChange = (editor, data, value) => {
  };
  const onBeforeChange = (editor, data, value) => {
    props.setCode(value);
  };
  return <CodeMirror value={props.code} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />
};

export default props => {

  const [code, setCode] = React.useState('');

  ipcRenderer.on('schema', (e, data) => {
    setCode(data);
  });

  ipcRenderer.on('editor', (err, data) => {
    setCode(data);
  });

  return <div id={'schemaBoard'}>
    <Editor code={code} setCode={setCode} />
  </div>
};
