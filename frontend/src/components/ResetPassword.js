import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { resetPasswordSchema } from "../schemas";

const ResetPassword = () => {
  const resetToken = useParams();
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
    useFormik({
      initialValues: { password: "", cpassword: "" },
      validationSchema: resetPasswordSchema,
      onSubmit: (values, action) => {
        // console.log(values, resetToken);
        action.resetForm();
      },
    });

  return (
    <div className="w-full max-w-xs m-auto mt-20">
      <h1 className="text-center mb-4 text-2xl">Reset Your password here</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            value={values.password}
            required
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cpassword"
            type="password"
            name="cpassword"
            placeholder="******************"
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            value={values.cpassword}
            required
          />
          {errors.cpassword && touched.cpassword ? (
            <p className="text-red-500 text-xs italic">{errors.cpassword}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </div>

        <div className="mb-4">
          
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
