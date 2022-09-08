import React, {  } from "react";
import { useFormik } from "formik";
import { emailSchema } from "../schemas";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetpassword } from "../redux/action-creators";

const ForgetPassword = () => {
  const userforgetpassword = useSelector((state) => state.forgetPassword);
  const { data } = userforgetpassword;
  const dispatch = useDispatch();
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
  useFormik({
      initialValues: { email: "" },
      validationSchema: emailSchema,
      onSubmit: (values, action) => {
        console.log(values.email, data);
        dispatch(forgetpassword(values.email));
        action.resetForm();
      },
    });

  
  return (
    <div className="w-96 mx-auto mt-40">
      <h1 className="text-center text-2xl">Forget password</h1>
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
          {data && (
            <p className="text-center text-white p-2 bg-green-700">
              {data}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
