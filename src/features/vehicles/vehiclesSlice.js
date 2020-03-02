import { createSlice } from '@reduxjs/toolkit';
import { getVehicles } from '../../api';

const initialState = {
  loading: false,
  error: null,
  currentPageVehicles: [],
  pageCount: 0,
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
      const { vehicles, pageCount } = payload;

      state.loading = false;
      state.currentPageVehicles = vehicles;
      state.pageCount = pageCount;
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

export const fetchVehicles = () => async dispatch => {
  try {
    dispatch(getVehiclesStart());
    const vehicles = await getVehicles();
    dispatch(getVehiclesSuccess(vehicles));
  } catch (err) {
    dispatch(getVehiclesFailed(err.toString()));
  }
};
