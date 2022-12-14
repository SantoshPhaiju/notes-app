import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, selectUser, userLogin } from "../features/user/userSlice";
import { ToastContainer } from "react-toastify";
import toastContext from "./context/toastContext";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const context = useContext(toastContext);
  const { toastError } = context;

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null && user.token !== undefined) {
      navigate("/");
      dispatch(getUserData());
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  useEffect(() => {
    if (user.error) {
      toastError(user.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.success, user.error]);

  const credentials = {
    email: "",
    password: "",
  };
  const { handleBlur, handleSubmit, handleChange, errors, values, touched } =
    useFormik({
      initialValues: credentials,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        const { email, password } = values;
        dispatch(userLogin({ email: email, password: password })).unwrap();
        action.resetForm();
      },
    });

  return (
    <>
      <div className="w-full max-w-xs m-auto mt-20">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/forgetpassword"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
