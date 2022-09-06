import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { FcAddImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/action-creators";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { data, success } = userRegister;
  const [error, setError] = useState(null);
  useEffect(() =>{
    if(success === false && data !== undefined){
      setError(data.error);
    }else if(success === true){
      setError(null);
      navigate("/login")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  const credentials = {
    email: "",
    username: "",
    password: "",
    cpassword: "",
  };
  const { values, handleBlur, touched, handleSubmit, errors, handleChange } =
    useFormik({
      initialValues: credentials,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        dispatch(register(values.username, values.email, values.password));
        action.resetForm();
      },
    });

  const onSelectFile = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files;
    const selectedFileArray = Array.from(selectedFile);

    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    // console.log(imageArray);
    setSelectedImage(imageArray);
  };

  return (
    <div>
      <div className="w-full max-w-xs m-auto mt-20">
        {error && data ? (
          <p className="text-red-700 text-center">{data.error}</p>
        ): null }
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          encType="multipart/form-data"
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
              placeholder="Email Address"
              autoComplete="off"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && touched.email ? (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              autoComplete="off"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.username && touched.username ? (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              autoComplete="off"
              type="password"
              name="password"
              placeholder="******************"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              min="8"
              required
            />
            {errors.password && touched.password ? (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="cpassword"
              autoComplete="off"
              type="password"
              name="cpassword"
              placeholder="******************"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.cpassword && touched.cpassword ? (
              <p className="text-red-500 text-xs italic">{errors.cpassword}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-base font-bold font-mono text-center border-2 rounded-md cursor-pointer mb-2 text-blue-700"
              htmlFor="picture"
            >
              Add profile picture{" "}
              <FcAddImage className="inline-block h-8 w-8" />
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hidden"
              id="picture"
              autoComplete="off"
              type="file"
              name="picture"
              onChange={onSelectFile}
              onBlur={handleBlur}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
          </div>
          {selectedImage &&
            selectedImage.map((image) => {
              return (
                <div className="mb-6" key={image}>
                  <img src={image} alt="img here" />
                </div>
              );
            })}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Login?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
