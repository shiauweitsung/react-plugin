import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'status',
  initialState: {
    headerShow: true
  },
  reducers: {
    changeHeaderShow: (state) => {
      state.headerShow = !state.headerShow;
    }
  }
});

export const changeHeaderShowAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(changeHeaderShow());
  }, 3000);
};

// Action creators are generated for each case reducer function
export const { changeHeaderShow } = counterSlice.actions;
export const getHederShow = (state) => state.status.headerShow;

export default counterSlice.reducer;
