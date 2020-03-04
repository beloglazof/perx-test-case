import { combineReducers } from 'redux';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';
import vehiclesDisplayReducer from '../features/vehiclesDisplay/vehiclesDisplaySlice';
import dealersReducer from '../features/dealers/dealersSlice';

export default combineReducers({
  vehicles: vehiclesReducer,
  vehiclesDisplay: vehiclesDisplayReducer,
  dealers: dealersReducer
});
