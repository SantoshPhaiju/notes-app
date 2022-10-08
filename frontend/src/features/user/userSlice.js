import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/login", data);
        return response.data;
    } catch (error) {
        return error.message;
    }
  }
);

const initialState = {
  user: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeded";
        state.user = action.payload;
        const token = action.payload.token;
        localStorage.setItem("token", JSON.stringify(token))
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
