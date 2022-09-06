import React, { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action-creators";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      console.log(data);
    }
  });
  const credentials = {
    email: "",
    password: "",
  };
  const userLogin = useSelector((state) => state.login);
  const { data } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
    useFormik({
      initialValues: credentials,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        dispatch(login(values.email, values.password));
        action.resetForm();
      },
    });

  return (
    <>
      <div className="w-full max-w-xs m-auto mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
