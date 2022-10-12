import React, { useRef } from "react";
import { useFormik } from "formik";
import { emailSchema } from "../schemas";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, getFrogetPasswordMessage } from "../features/user/userSlice";


const ForgetPassword = () => {
  const dispatch = useDispatch()
  const forgetPswdMsg = useSelector(getFrogetPasswordMessage);
  const msgRef = useRef();
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
  useFormik({
      initialValues: { email: "" },
      validationSchema: emailSchema,
      onSubmit: (values, action) => {
        action.resetForm();
        dispatch(forgetPassword(values));
      },
    });

  
  return (
    <div className="w-96 mx-auto mt-40">
      <h1 className="text-center text-2xl">Forget password</h1>
      {forgetPswdMsg.length !== 0 && <p ref={msgRef} className="text-center bg-green-700 text-white py-1 px-2 my-3 rounded-sm">{forgetPswdMsg.msg}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter email for password recovery
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            value={values.email}
            required
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Link
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Back to Login?
          </Link>
        </div>

        <div className="mb-4">
          
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
