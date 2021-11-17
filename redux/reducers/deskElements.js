const deskElements = (state = [], action) => {
    switch (action.type) {
        case 'PUSH':
            return state.concat(action.item);

        case 'EDIT': {
            state[action.index]=action.item;
            return state;
        }
        case 'SPLICE': {
            delete state[action.index];
            //state.splice(action.index);
            return state;
        }


        case 'CLEAN':
            return [];

        default:
            return state;
    }
}



export default deskElements;