export const addComponent = {
    name: 'C1',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const addComponentResult = {
    name: 'C1',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};

export const delComponent = {
    name: 'C2',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const delComponentResult = {
    name: 'C2',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};

export const updatesComponent = {
    name: 'C2',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const updatesResult = {
    name: 'C2',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};

export const addchildComponent = {
    parentComponent: {
      name: 'Root',
      parent: {},
      attributes: { id: 'ID' },
      children: []
    },
    child : {
      name: 'C1',
      parent: {},
      attributes: { id: 'ID' },
      children: []
    }
};

export const addchildResult = {
    parentComponent: {
      name: 'Root',
      parent: {},
      attributes: { id: 'ID' },
      children: []
    },
    child: {
      name: 'C1',
      parent: {},
      attributes: { id: 'ID' },
      children: []
    }
};

export const addAttributesComponent = {
    component: {
      name: 'C2',
      parent: {},
      attributes:
      { id: 'ID' },
      children: []
    },
    attributes : {
      name: 'S1'
    }
};

export const addAttributesResult = {
      component:{
        name: 'C2',
        parent: {},
        attributes:
        { id: 'ID' },
        children: []
      },
      attributes : {
          name: 'S1'
      }
};

export const removeAttributesComponent = {
    component:{
      name: 'C2',
      parent: {},
      attributes:
      { id: 'ID', name: 'S2' },
      children: []
    },
    attributeKey: 'id'
};

export const editcurrentComponent = {
    name: 'C2',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const editcurrentComponentResult = {
    name: 'C2',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};

export const setcurrentComponent = {
    name: 'C2',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const setcurrentComponentResult = {
    name: 'C2',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};

export const setselectedComponent = {
    name: 'C1',
    parent: {},
    attributes: { id: 'ID' },
    children: []
};

export const setselectedComponentResult = {
    name: 'C1',
    parent: {},
    attributes: {id: 'ID'},
    children: []
};
