import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: "",
    lastname: "",
    email: "",
    token: "",
  },
  reducers: {
    addUser: (state, action) => {
      console.log("dispatched");
      const { firstname, lastname, email, token } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.token = token;
    },
    removeUser: () => {
      return {
        name: "",
        email: "",
        token: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
