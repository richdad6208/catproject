import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  userData: "",
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.value = true;
    },
    loggedOut: (state) => {
      state.value = false;
    },
    inputUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { loggedIn, loggedOut, inputUser } = userSlice.actions;
