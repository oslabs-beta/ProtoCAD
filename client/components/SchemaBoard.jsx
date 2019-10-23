import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
// import {setCode} from "../actions/componentsAction";
import {useDispatch, useSelector} from "react-redux";

const Editor = props => {
  const externalCode = useSelector(state => state.code.data);
  const [code, setCode] = React.useState(useSelector(state => state.code.data));
  const dispatch = useDispatch();

  React.useEffect(() => {
    setCode(externalCode);
  }, [ externalCode ]);

  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true
  });

  const onChange = (editor, data, value) => {

  };

  const onBeforeChange = (editor, data, value) => {
    setCode(value);
  };

  return <CodeMirror value={code} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />
};

const Resolver = props => {

  const onChange = (editor, data, value) => {

  };
  
  const onBeforeChange = (editor, data, value) => {

  };

  return <CodeMirror value={code} onBeforeChange={onBeforeChange} onChange={onChange} options={{ lineNumbers: true, lineWrapping: true }} />
};

export default props => {
  return <div id={'schemaBoard'}>
    <Editor/>
  </div>
};
