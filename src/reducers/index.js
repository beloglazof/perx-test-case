import { combineReducers } from 'redux';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';

export default combineReducers({
  vehicles: vehiclesReducer,
});
