export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, isloggged: false };
    case "USER_LOGIN_SUCCESSFULL":
      return { loading: false, data: action.payload, isloggged: true };
    case "USER_LOGOUT_SUCCESSFULL":
      return { isloggged: false };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    default:
      return { loading: false, success: null };
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true, success: false };
    case "USER_REGISTER_SUCCESSFULL":
      return { loading: false, data: action.payload, success: true };
    case "USER_REGISTER_FAIL":
      return { loading: false, data: action.payload, success: false };
    default:
      return { loading: false, success: null};
  }
};
