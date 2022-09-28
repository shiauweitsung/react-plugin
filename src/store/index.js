import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import statusReducer from './status';

export default configureStore({
  reducer: {
    counter: counterReducer,
    status: statusReducer
  }
});
