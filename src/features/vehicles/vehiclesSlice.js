import { createSlice } from '@reduxjs/toolkit';
import { getVehicles } from '../../api';
import { fetchDealers } from '../dealers/dealersSlice';

const initialState = {
  loading: false,
  error: null,
  vehiclesById: {},
  currentPageVehicles: [],
  totalCount: 0,
};

const vehicles = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    getVehiclesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getVehiclesSuccess(state, { payload }) {
      const { vehicles, totalCount } = payload;

      state.loading = false;
      state.error = null;

      state.totalCount = totalCount;
      state.currentPageVehicles = vehicles.map(vehicle => vehicle.id);

      vehicles.forEach(vehicle => {
        state.vehiclesById[vehicle.id] = vehicle;
      });
    },
    getVehiclesFailed(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getVehiclesFailed,
  getVehiclesStart,
  getVehiclesSuccess,
} = vehicles.actions;

export default vehicles.reducer;

export const fetchVehicles = (page, perPage) => async dispatch => {
  try {
    dispatch(getVehiclesStart());
    const vehiclesData = await getVehicles(page, perPage);
    dispatch(getVehiclesSuccess(vehiclesData));

    const { vehicles } = vehiclesData;
    if (vehicles.length > 0) {
      const dealerIdList = vehicles.map(({ dealer }) => dealer);
      dispatch(fetchDealers(dealerIdList));
    }
  } catch (err) {
    dispatch(getVehiclesFailed(err.toString()));
  }
};
