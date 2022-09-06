
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    // console.log(email, password, JSON.stringify({email, password}));
    const response = await fetch("http://localhost:8000/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem("token", JSON.stringify(data.token));
      const response = await fetch("http://localhost:8000/api/auth/getuserdata", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': data.token
        }
      })
      const userData = await response.json();
      dispatch({ type: "USER_LOGIN_SUCCESSFULL", payload: userData });
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  } catch (error) {
    console.log(error);
  }
};


export const logout = () => async (dispatch) =>{
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  dispatch({type: "USER_LOGOUT_SUCCESSFULL"});
}


export const register = (username, email, password, picture) => async (dispatch) =>{
  try {
    dispatch({type: "USER_REGISTER_REQUEST"})
    const response = await fetch("http://localhost:8000/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, email, password}),
      method: "POST"
    });
    const data = await response.json();
    if(data.success === true){
      dispatch({type: "USER_REGISTER_SUCCESSFULL", payload: data});
    }else{
      dispatch({type: "USER_REGISTER_FAIL", payload: data});
    }
  } catch (error) {
    // console.log(error);
    dispatch({type: "USER_REGISTER_FAIL", payload: error});
  }
}
