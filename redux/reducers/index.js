import isLogged from './isLogged';
import deskElements from './deskElements';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: isLogged,
    deskElements: deskElements,

});
export default allReducers;