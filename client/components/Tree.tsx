import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tree from 'react-d3-tree';
import { ComponentInt } from '../utils/InterfaceDefinitions'
import { setCurrentComponent, setSelectedComponent } from '../actions/componentsAction';
import MyModal from './Modal';


interface PropsInt {
  components: any;
  current: ComponentInt;
}

const MyTree: React.FC<PropsInt> = (props): JSX.Element => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslation] = useState({ x: 0, y: 0 });

  useEffect(() => {
      const dimensions = this.treeContainer.getBoundingClientRect();
      setTranslation({ x: dimensions.width / 2, y: 50 });
      document.querySelector('#tree').addEventListener('click', onMouseClick);
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onMouseClick = e => {
    setTranslation({ x: e.clientX, y: e.clientY })
  };

  const onClick = node => {
    handleOpen();
    const selected = props.components.filter(item => item.name === node.name);
    if (selected.length > 0) dispatch(setSelectedComponent(selected[0]));
  };

  return (
    <div id="tree" ref={tc => (this.treeContainer = tc)}>
      <Tree
        data={props.current}
        translate={translate}
        collapsible={false}
        onClick={onClick}
        orientation={'vertical'}
      />
      <MyModal
        handleClose={handleClose}
        open={open}
        x={clickPosition.x}
        y={clickPosition.y}
      />
    </div>
  );
}

export default MyTree;
