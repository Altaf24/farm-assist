import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for user state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions
export const { setUser, addUser, clearUser } = userSlice.actions;


// Create the Redux store
const appStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default appStore;
