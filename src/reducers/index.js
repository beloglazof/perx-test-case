import { combineReducers } from 'redux';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';
import vehiclesDisplayReducer from '../features/vehiclesDisplay/vehiclesDisplaySlice';

export default combineReducers({
  vehicles: vehiclesReducer,
  vehiclesDisplay: vehiclesDisplayReducer,
});
