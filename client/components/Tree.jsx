import * as React from 'react';
import Tree from 'react-d3-tree';
import { connect } from 'react-redux';
import { setCurrentComponent, setSelectedComponent } from '../actions/componentsAction';
import MyModal from './Modal.jsx';
import _ from 'lodash';

/**
 * ************************************
 *
 * @module  MyTree
 * @description Stateful component that renders and controls the d3 tree graph and modal
 *
 * ************************************
 */
class MyTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickPosition: { // position of modal based on clicked node 
        x: 0,
        y: 0,
      },
      open: false, // status of modal
      translate: { // position of the root node
        x: 0,
        y: 0,
      },
      component: {}
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState((prevState) => ({
      ...prevState,
      translate: {
        x: dimensions.width / 2,
        y: 50,
      },
    }));

    document.querySelector('#tree').addEventListener('click', this.onMouseClick);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onMouseClick = (e) => this.setState({
    clickPosition: {
      x: e.clientX,
      y: e.clientY,
    },
  });

  // updates the state of the selected node and opens the modal
  onClick = (node) => {
    console.log(node);
    const name = node.name[0] === '[' ? node.name.slice(1, node.name.length - 1) : node.name;
    this.handleOpen();
    const selected = this.props.components.filter((item) => item.name === name);
    if (selected.length > 0) {
      return this.props.setSelectedComponent(selected[0]);
    }
  };

  // componentWillReceiveProps(nextProps, nextContext) {
  //   if (!_.isEqual(this.props, nextProps)) {
  //     this.setState(prevState => ({
  //       ...prevState,
  //       component: nextProps.current
  //     }))
  //   }
  // }

  render() {
    const { current } = this.props;
    const { clickPosition, open, translate } = this.state;

    return (
      <div id="tree" style={{ width: '100%', height: '100%' }} ref={(tc) => (this.treeContainer = tc)}>
        <Tree
          className="myTree"
          styles={{ width: '100%', height: '100%' }}
          translate={translate}
          data={current}
          collapsible={false}
          onClick={this.onClick}
          orientation="vertical"
        />
        <MyModal
          handleClose={this.handleClose}
          open={open}
          x={clickPosition.x}
          y={clickPosition.y}
        />
      </div>
    );
  }
}

const recursivelyGetChildren = (component) => {
  return {
    ...component,
    children: component.children.map(item => recursivelyGetChildren(item.array ? { ...item.component, name: `[${item.component.name}]` } : item.component))
  };
};

const mapStateToProps = (state) => ({
  components: state.components.data,
  current: _.isEmpty(state.current.data) ? state.current.data : recursivelyGetChildren(state.current.data),
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedComponent: (data) => dispatch(setSelectedComponent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTree);
