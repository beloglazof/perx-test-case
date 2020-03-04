import { createSlice } from '@reduxjs/toolkit';
import { getDealers } from '../../api';

const initialState = {
  loading: false,
  error: null,
  dealersById: {},
};

const dealers = createSlice({
  name: 'dealers',
  initialState,
  reducers: {
    getDealersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDealersSuccess(state, { payload: dealers }) {
      state.loading = false;
      state.error = null;

      dealers.forEach(dealer => {
        state.dealersById[dealer.id] = dealer;
      });
    },
    getDealersFailed(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const {
  getDealersFailed,
  getDealersStart,
  getDealersSuccess,
} = dealers.actions;

export default dealers.reducer;

export const fetchDealers = (idList) => async dispatch => {
  try {
    dispatch(getDealersStart());
    const dealers = await getDealers(idList);
    dispatch(getDealersSuccess(dealers));
  } catch (err) {
    dispatch(getDealersFailed(err.toString()));
  }
};
