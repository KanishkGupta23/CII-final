import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: null, // Store user data
};

// Create the slice
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    // Action to set user data
    setUser: (state, action) => {
      state.user = action.payload; // Store user data
    },
    // Action to clear user data
    clearUser: (state) => {
      state.user = null; // Clear user data
    },
  },
});

// Export the action creators
export const { setUser, clearUser } = userDataSlice.actions;

// Export the reducer
export default userDataSlice.reducer;
