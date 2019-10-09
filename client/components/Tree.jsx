import * as React from 'react';
import Tree from 'react-d3-tree';
import { connect } from 'react-redux';
import { setCurrentComponent } from '../actions/componentsAction';
import MyModal from './Modal.jsx';

class MyTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickPosition: {
        x: 0,
        y: 0
      },
      open: false,
      selectedNode: {}
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onMouseClick = e => this.setState({
    clickPosition: {
      x: e.clientX,
      y: e.clientY
    }
  });

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState(prevState => ({
      ...prevState,
      translate: {
        x: dimensions.width / 2,
        y: 50
      }
    }));

    document.querySelector('#tree').addEventListener('click', this.onMouseClick);
  }

  onClick = node => {
    this.handleOpen();
    this.setState({
      selectedNode: node
    })
  };

  render() {
    return <div id={'tree'} style={{width: '100%', height: '100%'}} ref={tc => (this.treeContainer = tc)}>
      <Tree className={'myTree'} translate={this.state.translate}  data={this.props.current} collapsible={false} onClick={this.onClick} orientation={'vertical'} />
      <MyModal handleClose={this.handleClose} open={this.state.open} x={this.state.clickPosition.x} y={this.state.clickPosition.y} selectedNode={this.state.selectedNode} />
    </div>;
  }

}

const mapStateToProps = state => ({
  components: state.components.data,
  current: state.current.data
});

const mapDispatchToProps = dispatch => ({
  setCurrent: data => {
    console.log('called!');
    dispatch(setCurrentComponent(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTree);