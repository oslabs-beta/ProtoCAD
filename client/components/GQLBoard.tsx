import * as React from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from "react-redux";
import { GlobalState } from "../utils/InterfaceDefinitions";

export default (props) => {
    const gqlData = useSelector((state: GlobalState) => state.gqlData.data);
    const myRef = React.useRef();
    const [translate, setTranslate] = React.useState({x: 0, y: 0});

    React.useEffect(() => {
        const dimensions = document.querySelector('.rd3t-tree-container.rd3t-grabbable').getBoundingClientRect();
        setTranslate({
            x: dimensions.width / 2,
            y: 50
        });
    }, []);

    return (
        <div id="gql-board">
            <Tree data={gqlData} translate={translate} collapsible={false} orientation="vertical" ref={myRef} />
        </div>
    );
};