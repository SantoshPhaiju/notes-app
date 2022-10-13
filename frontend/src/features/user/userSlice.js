import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/auth/getuserdata",
      {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        data
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forgetpassword",
        email
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    const { resetToken } = data;
    try {
      // console.log(data);
      // console.log(resetToken);
      const response = await axios.put(
        `http://localhost:8000/api/auth/resetpassword/${resetToken}`,
        data
      );
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
  userData: [],
  registrationMsg: [],
  forgetPasswordMsg: [],
  resetPasswordMsg: [],
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
        if (token !== undefined) {
          localStorage.setItem("token", JSON.stringify(token));
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = "succeded";
        state.userData = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeded";
        state.registrationMsg = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.forgetPasswordMsg = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeded";
        state.resetPasswordMsg = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserData = (state) => state.user.userData;
export const getRegistrationMessage = (state) => state.user.registrationMsg;
export const getFrogetPasswordMessage = (state) => state.user.forgetPasswordMsg;
export const getResetPasswordMessage = (state) => state.user.resetPasswordMsg;

export default userSlice.reducer;
