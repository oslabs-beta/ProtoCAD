import * as React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'

// import CodeMirror from 'react-codemirror';

const ipcRenderer = window.ipcRenderer;
console.log(ipcRenderer);

const Editor = props => {
    const [option, setOptions] = React.useState({
        lineNumbers: true
    });

    console.log('re-render!');

    const onChange = (editor, data, value) => {
      // console.log('onChange');
      // console.log(editor);
      // console.log(data);
      // console.log(value);
    };
    const onBeforeChange = (editor, data, value) => {
      // console.log('onBeforeChange');
      // console.log(editor);
      // console.log(data);
      // console.log(value);
      props.setCode(value);
    };
  return <CodeMirror value={props.code} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />
};

export default props => {

  const [code, setCode] = React.useState('');

  ipcRenderer.on('schema', (e, data) => {
    // const node = document.querySelector('.ReactCodeMirror textarea');
    // node.value = 'Hello, Code';
    setCode(data);
  });
  React.useEffect(() => {
    console.log(code);
  }, [code]);
   return <div id={'schemaBoard'}>
       <Editor code={code} setCode={setCode} />
   </div>
};