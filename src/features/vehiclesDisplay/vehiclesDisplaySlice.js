import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  perPage: 10,
};

const vehiclesDisplay = createSlice({
  name: 'vehiclesDisplay',
  initialState,
  reducers: {
    setCurrentPage(state, { payload }) {
      state.page = payload;
    },
  },
});

export const {setCurrentPage} = vehiclesDisplay.actions

export default vehiclesDisplay.reducer;
