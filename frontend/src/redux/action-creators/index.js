export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    // console.log(email, password, JSON.stringify({email, password}));
    const response = await fetch("http://localhost:8000/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem("token", JSON.stringify(data.token));
      const response = await fetch(
        "http://localhost:8000/api/auth/getuserdata",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": data.token,
          },
        }
      );
      const userData = await response.json();
      dispatch({ type: "USER_LOGIN_SUCCESSFULL", payload: userData });
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  dispatch({ type: "USER_LOGOUT_SUCCESSFULL" });
};

export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      body: formdata,
    });
    const data = await response.json();
    if (data.success === true) {
      dispatch({ type: "USER_REGISTER_SUCCESSFULL", payload: data });
    } else {
      dispatch({ type: "USER_REGISTER_FAIL", payload: data.error });
    }
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

export const forgetpassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FORGET_PASSWORD_REQUEST" });
    const response = await fetch(
      "http://localhost:8000/api/auth/forgetpassword",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success === true) {
      dispatch({ type: "SUCCESSFULLY_SENT", payload: data.msg });
    } else {
      dispatch({ type: "SEND_FAIL", payload: data.msg });
    }
  } catch (error) {
    dispatch({ type: "SEND_FAIL", payload: error });
  }
};

export const resetpassword = (password, resetToken) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });
    const response = await fetch(
      `http://localhost:8000/api/auth/resetpassword/${resetToken}`,
      {
        method: "PUT",
        body: JSON.stringify({ password: password }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    if (data.success === true) {
      dispatch({ type: "SUCCESSFULLY_RESET", payload: data.msg });
    } else {
      dispatch({ type: "RESET_FAIL", payload: data.msg });
    }
  } catch (error) {
    dispatch({ type: "RESET_FAIL", payload: error });
  }
};
