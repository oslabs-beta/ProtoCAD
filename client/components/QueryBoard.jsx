import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import {useDispatch, useSelector } from "react-redux";
import { setResolverCode } from '../actions/componentsAction';

export default props => {
  const externalCode = useSelector(state => state.resolver.data);
  const [resolverCode, setCode] = React.useState(useSelector(state => state.resolver.data));
  const dispatch = useDispatch();

  // const {resolver, setResolver} = React.useContext(ResolveContext);

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
    props.setQuery(value);
    // dispatch(setResolverCode(value));
  };

  return <CodeMirror value={props.query} onBeforeChange={onBeforeChange} onChange={onChange} options={option} />
};