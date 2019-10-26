import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import {useDispatch, useSelector } from "react-redux";

export default props => {
  // const [resolverCode, setCode] = React.useState(useSelector(state => state.resolver.data));
  const dispatch = useDispatch();

  // const {resolver, setResolver} = React.useContext(ResolveContext);

  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true,
  });

  const onChange = (editor, data, value) => {

  };

  const onBeforeChange = (editor, data, value) => {
    // dispatch(setResolverCode(value));
    props.setResolver(value);
  };

  return <CodeMirror value={props.resolver} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />;
};
