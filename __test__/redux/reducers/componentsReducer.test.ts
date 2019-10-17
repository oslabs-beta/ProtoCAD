import componentsReducer from "../../../client/reducer/componentsReducer";
import { addComponent, delComponent, addAttributesComponent, removeAttributesComponent } from '../../fixtures/components/componentsData';
import { CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT, ADD_ATTRIBUTE, DELETE_ATTRIBUTE, ADD_CHILD_COMPONENT, DELETE_ONE_COMPONENT } from '../../../client/actions/types';

describe('Components Reducer', function () {

    beforeEach(() => {
    });

    it('expected state for CREATE_COMPONENT', () => {
        const action = {
            payload: addComponent,
            type: CREATE_COMPONENT
        };
        const updatedState = componentsReducer(undefined, action);

        expect(updatedState.data).toHaveLength(2);
        expect(updatedState.data[0]).toEqual({
            name: 'Root',
            attributes: { id: 'ID' },
            parent: {},
            children: []
        });
        expect(updatedState.data[1]).toEqual(addComponent);
    });

    it('expected state for DELETE_COMPONENT', () => {

        const addAction = {
            payload: addComponent,
            type: CREATE_COMPONENT
        };
        componentsReducer(undefined, addAction);

        const removeAction = {
            payload: delComponent,
            type: DELETE_COMPONENT
        };
        const updatedState = componentsReducer(undefined, removeAction);

        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0]).toEqual({
            name: 'Root',
            attributes: { id: 'ID' },
            parent: {},
            children: []
        });
    });


    it('expected state for DELETE_COMPONENT for main component', () => {

        const removeAction = {
            payload: {
              name: 'Root',
              attributes: { id: 'ID' },
              parent: {},
              children: []
            },
            type: DELETE_COMPONENT
        };
        const updatedState = componentsReducer(undefined, removeAction);

        expect(updatedState.data).toHaveLength(0);
    });

    it('expected state for UPDATE_COMPONENT', () => {

        const updateAction = {
            payload: {
                name: 'Root',
                attributes: {id: 'ID', name: 'S0'},
                children: []
            },
            type: UPDATE_COMPONENT
        };
        const updatedState = componentsReducer(undefined, updateAction);
        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].attributes.name).toEqual('S0');
    });

    it('expected state for UPDATE_COMPONENT - child component', () => {

        const addAction = {
            payload: {
                name: 'C1',
                attributes: { id: 'ID' },
                children: [{
                  name: 'C2',
                  attributes: { id: 'ID' },
                  children: []
                }]
            },
            type: CREATE_COMPONENT
        };
        const addedComponent = componentsReducer(undefined, addAction);

        const updateAction = {
            payload: {
                name: 'C2',
                attributes: {id: 'ID', name: 'S3'},
                children: []
            },
            type: UPDATE_COMPONENT
        };
        const updatedState = componentsReducer(addedComponent, updateAction);
        expect(updatedState.data).toHaveLength(2);
        expect(updatedState.data[1].children[0].attributes.name).toEqual('S3');
    });

    it('expected state for ADD_ATTRIBUTE', () => {

        const addCompAction = {
            payload: addComponent,
            type: CREATE_COMPONENT
        };
        componentsReducer(undefined, addCompAction);

        const addAction = {
            payload: { selectedComponent: {
                        name: 'Root',
                        attributes:
                        { id: 'ID' },
                        children: []
                      },
                      attributes : {
                          name: 'S1'
                      }
                    },
            type: ADD_ATTRIBUTE
        };
        const updatedState = componentsReducer(undefined, addAction);

        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].attributes.name).toEqual('S1');
    });

    it('expected state for ADD_ATTRIBUTE - child component', () => {

        const addAction = {
            payload: {
                name: 'C1',
                attributes: { id: 'ID' },
                children: [{
                  name: 'C2',
                  attributes: { id: 'ID' },
                  children: []
                }]
            },
            type: CREATE_COMPONENT
        };
        const addedComponent = componentsReducer(undefined, addAction);

        const addAttributeAction = {
            payload: {
              selectedComponent: {
                name: 'C2',
                attributes: { id: 'ID' },
                children: []
              },
              attributes : {
                  name: 'S1'
              }
            },
            type: ADD_ATTRIBUTE
        };
        const addedAttribute = componentsReducer(addedComponent, addAttributeAction);

        expect(addedAttribute.data).toHaveLength(2);
        expect(addedAttribute.data[1].children[0].name).toEqual('C2');
        expect(addedAttribute.data[1].children[0].attributes.name).toEqual('S1');
    });

    it('expected state for DELETE_ATTRIBUTE', () => {

      const addAction = {
          payload: {
              name: 'C1',
              attributes: { id: 'ID', name: 'S9' },
              children: []
          },
          type: CREATE_COMPONENT
      };
      const addedComponent = componentsReducer(undefined, addAction);

        const removeAction = {
            payload: {
              selectedComponent: {
                name: 'C1',
                attributes: { id: 'ID', name: 'S9' },
                children: []
              },
              attributeKey: 'name',
            },
            type: DELETE_ATTRIBUTE
        };

        const updatedState = componentsReducer(addedComponent, removeAction);
        expect(updatedState.data).toHaveLength(2);        expect(updatedState.data[1].attributes.name).toBeNull;
    });

    it('expected state for ADD_CHILD_COMPONENT', () => {

        const addChildAction = {
            payload: {
                parentComponent : {
                    name: 'Root',
                    attributes: { id: 'ID' },
                    children: []
                },
                 data: {
                    name: 'C10',
                    attributes: { id: 'ID' },
                    children: []
                 }
            },
            type: ADD_CHILD_COMPONENT
        };
        const updatedState = componentsReducer(undefined, addChildAction);
        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].children[0].name).toEqual('C10');
    });

    it('expected state for ADD_CHILD_COMPONENT - child component', () => {

        const addAction = {
            payload: {
                name: 'C1',
                attributes: { id: 'ID' },
                children: [{
                  name: 'C2',
                  attributes: { id: 'ID' },
                  children: []
                }]
            },
            type: CREATE_COMPONENT
        };
        const addedComponent = componentsReducer(undefined, addAction);

        const addChildAction = {
            payload: {
                parentComponent : {
                    name: 'C2',
                    attributes: { id: 'ID' },
                    children: []
                },
                 data: {
                    name: 'C12',
                    attributes: { id: 'ID' },
                    children: []
                 }
            },
            type: ADD_CHILD_COMPONENT
        };
        const updatedState = componentsReducer(addedComponent, addChildAction);
        expect(updatedState.data).toHaveLength(2);
        expect(updatedState.data[1].children[0].children[0].name).toEqual('C12');
    });


    it('expected state for DELETE_ONE_COMPONENT', () => {

        const updateAction = {
            payload: {
              name: 'Root',
              attributes: {id: 'ID', name: 'S3'},
              children: [{
                name: 'C1',
                attributes: {id: 'ID', name: 'S5'},
                children: []
              }]
            },
            type: UPDATE_COMPONENT
        };

        const updatedRoot = componentsReducer(undefined, updateAction);

        const deleteChildAction = {
            payload: {
                parentComponent : {
                  name: 'Root',
                  attributes: {id: 'ID', name: 'S3'},
                  children: [{
                    name: 'C1',
                    attributes: {id: 'ID', name: 'S5'},
                    children: []
                  }]
                },
                data: {
                  name: 'C1',
                  attributes: { id: 'ID' },
                  children: []
                }
            },
            type: DELETE_ONE_COMPONENT
        };
        const updatedState = componentsReducer(updatedRoot, deleteChildAction);
        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].children).toHaveLength(0);
    });


    it('expected state for DELETE_ONE_COMPONENT - other child components', () => {

        const updateAction = {
            payload: {
              name: 'Root',
              attributes: {id: 'ID', name: 'S3'},
              children: [{
                name: 'C1',
                attributes: {id: 'ID', name: 'S5'},
                children: [{
                  name: 'C2',
                  attributes: {id: 'ID', name: 'S7'},
                  children: []
                }]
              }]
            },
            type: UPDATE_COMPONENT
        };

        const updatedRoot = componentsReducer(undefined, updateAction);

        const deleteChildAction = {
            payload: {
                parentComponent : {
                  name: 'C1',
                  attributes: {id: 'ID', name: 'S5'},
                  children: [{
                    name: 'C2',
                    attributes: {id: 'ID', name: 'S7'},
                    children: []
                  }]
                },
                data: {
                  name: 'C2',
                  attributes: { id: 'ID', name: 'S7' },
                  children: []
                }
            },
            type: DELETE_ONE_COMPONENT
        };
        const updatedState = componentsReducer(updatedRoot, deleteChildAction);
        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].children[0].children).toBeNull;
    });


    it('expected default state', () => {

      const defaultState = {
        error: null,
        loading: false,
        data: [{
          name: 'Root',
          attributes: {
            'id': 'ID',
          },
          parent: {},
          children: []
        }]
      };

      const updatedState = componentsReducer(defaultState, {});
      expect(updatedState.data).toHaveLength(1);
      expect(updatedState.data[0]).toHaveProperty('name', 'Root');
    });
});
