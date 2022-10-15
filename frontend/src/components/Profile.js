import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/coverPage.jpg";
import {
  getUserData,
  selectUserData,
  updateProfile,
} from "../features/user/userSlice";
import { updateSchema } from "../schemas";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(getUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userData = useSelector(selectUserData);
  // console.log(userData);
  const username = userData.username;
  const picture = userData.picture;
  const email = userData.email;
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const details = {
    username: username,
    picture: "",
    email: email,
  };

  const {
    values,
    handleBlur,
    touched,
    handleSubmit,
    errors,
    handleChange,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: details,
    validationSchema: updateSchema,
    onSubmit: (values, action) => {
      const formdata = new FormData();
      formdata.append("username", values.username);
      formdata.append("email", values.email);
      if (values.picture) {
        formdata.append("picture", values.picture, values.picture.name);
      }
      dispatch(updateProfile(formdata));
      action.resetForm();
      setSelectedImage([]);
    },
  });

  const onSelectFile = (e) => {
    // console.log(e.currentTarget.files[0]);
    const selectedFile = e.target.files;
    const selectedFileArray = Array.from(selectedFile);

    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    // console.log(imageArray);
    setSelectedImage(imageArray);
    setFieldValue("picture", e.target.files[0]);
  };

  return (
    <>
      <div className="profileDiv mt-0 mx-auto w-[1200px] bg-slate-100 h-auto">
        <div className="userData flex justify-center items-center flex-col">
          <div className="coverImage w-full">
            <img
              src={coverImage}
              alt="coverImage here"
              className="w-full h-[250px]"
            />
          </div>
          <div className="profileImage  rounded-full  relative -top-20">
            <img
              src={picture}
              alt="profileImage here"
              className="rounded-full w-40 h-40 border-2 border-blue-800 shadow-xl shadow-slate-600/30"
            />
            <h2 className="text-center mt-5 text-2xl font-roboto">
              {username && capitalize(username)}
            </h2>
          </div>
        </div>
        <div className="details w-full grid grid-cols-12 gap-10 bg-gray-50 shadow-lg mb-10 shadow-gray-600/40 mt-4">
          <div className="left col-span-6 ml-4">
            <div className="buttons my-6">
              <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={e => setShow(!show)}>
                Edit Details
              </button>
            </div>
            {show && <form action="" onSubmit={handleSubmit} className="bg-indigo-500/50 py-8 px-4 my-6 rounded-lg shadow-xl shadow-gray-700/50">
              <div className="flex items-center gap-5 w-[500px] flex-col ">
                <div className="formGroup flex flex-row gap-2 items-center w-full">
                  <label
                    htmlFor="username"
                    className="font-roboto text-slate-500 text-lg"
                  >
                    Username:{" "}
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    className="py-2 px-4 rounded-sm font-roboto text-slate-800 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                </div>
                {errors.username && touched.username ? (
                  <p className="text-red-500 text-xs italic">
                    {errors.username}
                  </p>
                ) : null}
                <div className="formGroup flex flex-row gap-2 items-center w-full">
                  <label
                    htmlFor="email"
                    className="font-roboto text-slate-500 text-lg"
                  >
                    Email:{" "}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    className="py-2 px-4 rounded-sm font-roboto text-slate-800 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                ) : null}
                <div className="formGroup flex flex-row gap-2 items-center w-full">
                  <label
                    htmlFor="picture"
                    className="font-roboto block text-base font-bold text-center border-2 rounded-md cursor-pointer mb-2 text-blue-700 w-full"
                  >
                    Add profile picture{" "}
                    <FcAddImage className="inline-block h-8 w-8" />
                  </label>
                  <input
                    type="file"
                    id="picture"
                    name="picture"
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hidden"
                    onChange={onSelectFile}
                  />
                </div>
              </div>
              {selectedImage &&
                selectedImage.map((image) => {
                  return (
                    <div className="mb-6" key={image}>
                      <img
                        src={image}
                        alt="img here"
                        className="h-auto w-[70%] mx-auto"
                      />
                    </div>
                  );
                })}
              <button
                type="submit"
                className=" mt-4  mb-4 px-10 py-2.5 bg-blue-600 text-white font-medium text-lg leading-tight uppercase rounded-md shadow-xl hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Update
              </button>
            </form>}
          </div>
          <div className="left col-span-6 flex items-center justify-center">
            <h2 className="text-xl font-work-sans font-thin">Email: {email}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
