import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: "",
    lastname: "",
    email: "",
    token: "",
    isAdmin: false,
  },
  reducers: {
    addUser: (state, action) => {
      const { firstname, lastname, email, token, isAdmin } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.token = token;
      state.isAdmin = isAdmin;
    },
    removeUser: () => {
      return {
        firstname: "",
        lastname: "",
        email: "",
        token: "",
        isAdmin: false,
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
