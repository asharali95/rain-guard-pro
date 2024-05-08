import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // Create this reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your auth reducer here
  },
});

export default store;