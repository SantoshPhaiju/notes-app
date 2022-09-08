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
      return { loading: false, errorMsg: action.payload, success: false };
    default:
      return { loading: false, success: false, errorMsg: null };
  }
};

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGET_PASSWORD_REQUEST":
      return { loading: true};
    case "SUCCESSFULLY_SENT":
      return { loading: false, data: action.payload };
    case "SEND_FAIL":
      return { loading: false, data: action.payload };
    default:
      return { loading: false };
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "RESET_PASSWORD_REQUEST":
      return { loading: true};
    case "SUCCESSFULLY_RESET":
      return { loading: false, data: action.payload };
    case "RESET_FAIL":
      return { loading: false, data: action.payload };
    default:
      return { loading: false };
  }
};
