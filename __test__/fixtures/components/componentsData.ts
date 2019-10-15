export const addComponent = {
    name: 'C1',
    attributes: { id: 'ID' },
    children: []
};

export const addComponentResult = {
    name: 'C1',
    attributes: {id: 'ID'},
    children: []
};

export const delComponent = {
    name: 'C2',
    attributes: { id: 'ID' },
    children: []
};

export const delComponentResult = {
    name: 'C2',
    attributes: {id: 'ID'},
    children: []
};

export const updatesComponent = {
    name: 'C2',
    attributes: { id: 'ID' },
    children: []
};

export const updatesResult = {
    name: 'C2',
    attributes: {id: 'ID'},
    children: []
};

export const addchildComponent = {
    parentComponent : {
    name: 'C2',
    attributes: { id: 'ID' },
    children: []
},
     data :{
        name: 'C10',
        attributes: { id: 'ID' },
        children: []
     }
};

export const addchildResult = {
    parentComponent : {
        name: 'C2',
        attributes: { id: 'ID' },
        children: []
    },
         data :{
            name: 'C10',
            attributes: { id: 'ID' },
            children: []
         }
};

export const addAttributesComponent = {
    selectedComponent:{
    name: 'C2',
    attributes:
    { id: 'ID' },
    children: []
    },
    attributes : {
        name: 'S1'
    }
};

export const addAttributesResult = {
    selectedComponent:{
        name: 'C2',
        attributes:
        { id: 'ID' },
        children: []
        },
        attributes : {
            name: 'S1'
        }
};

export const removeAttributesComponent = {
    selectedComponent:{
    name: 'C2',
    attributes:
    { id: 'ID', name: 'S2' },
    children: []
    },
    attributes : {
        name: 'S2'
    }
};

export const editcurrentComponent = {
    name: 'C2',
    attributes: { id: 'ID' },
    children: []
};

export const editcurrentComponentResult = {
    name: 'C2',
    attributes: {id: 'ID'},
    children: []
};

export const setcurrentComponent = {
    name: 'C2',
    attributes: { id: 'ID' },
    children: []
};

export const setcurrentComponentResult = {
    name: 'C2',
    attributes: {id: 'ID'},
    children: []
};

export const setselectedComponent = {
    name: 'C1',
    attributes: { id: 'ID' },
    children: []
};

export const setselectedComponentResult = {
    name: 'C1',
    attributes: {id: 'ID'},
    children: []
};
