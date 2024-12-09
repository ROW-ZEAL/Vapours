import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  name: "",
};
export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone_number = action.payload.phone_number;
    },
    unSetUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone_number = action.payload.phone_number;
    },
  },
});

export const { setUserInfo, unSetUserInfo } = userSlice.actions;
export default userSlice.reducer;
