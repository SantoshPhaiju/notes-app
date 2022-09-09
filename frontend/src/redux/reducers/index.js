import { combineReducers } from "redux";
import {
  forgetPasswordReducer,
  resetPasswordReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./userReducers";

export const reducers = combineReducers({
  login: userLoginReducer,
  userRegister: userRegisterReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
});
