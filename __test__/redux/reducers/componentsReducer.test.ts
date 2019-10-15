import componentsReducer from "../../../client/reducer/componentsReducer";
import { addComponent, delComponent, addAttributesComponent, removeAttributesComponent } from '../../fixtures/components/componentsData';
import { CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT, ADD_ATTRIBUTE, DELETE_ATTRIBUTE, ADD_CHILD_COMPONENT } from '../../../client/actions/types';



describe('Components Reducer', function () {

    beforeEach(() => {
    });

    it('componentsReducer expected state when creating a component', () => {
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

    it('componentsReducer expected state when deleting a component', () => {

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

    it('componentsReducer expected state when updating a component', () => {

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

    it('componentsReducer expected state when adding an attribute to a component', () => {

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

    it('componentsReducer expected state when removing an attribute from a component', () => {

        const removeAction = {
            payload: removeAttributesComponent,
            type: DELETE_ATTRIBUTE
        };
        const updatedState = componentsReducer(undefined, removeAction);
        expect(updatedState.data).toHaveLength(1);
        expect(updatedState.data[0].attributes.name).toBeNull;
    });

    it('componentsReducer expected state when adding child component to existing component', () => {

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
});
