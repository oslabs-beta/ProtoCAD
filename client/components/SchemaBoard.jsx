import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

export default (props) => {
  // const externalCode = useSelector((state) => state.code.data);

  // React.useEffect(() => {
  //   setCode(externalCode);
  // }, [externalCode]);

  const [option, setOptions] = React.useState({
    lineNumbers: true,
    lineWrapping: true,
  });

  const onBeforeChange = (editor, data, value) => props.setSchema(value);

  return <CodeMirror value={props.schema} onBeforeChange={onBeforeChange} options={option} />;
};

