import { combineReducers } from "redux";
import { addNoteReducer, getNotesReducer } from "./notesReducers";
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
  fetchAllNotes: getNotesReducer,
  addNote: addNoteReducer,
});
