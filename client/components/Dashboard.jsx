import React from 'react';
import Tree from './Tree.jsx';

export default props => {
  return <div id={'dashboard'}>
    <Tree />
    <div className={'modal'}>Content</div>
  </div>
};