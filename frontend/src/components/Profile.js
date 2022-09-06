import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log("done");
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let picture, email = "";
  let username = "User";
  if (localStorage.getItem("token")) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    username = userData.data.username;
    picture = userData.data.picture;
    email = userData.data.email;
  }
    return (
    <>
      <div className="profileDiv mt-5 mx-auto w-[400px] border-2">
        <div className="userData flex justify-center items-center flex-col">
          <img
            className="rounded-[50%] w-[100px] h-[100px] shadow-2xl shadow-gray-600/50 outline-none border-none"
            src={picture}
            alt="here is pictures"
          />

          <div className="data text-xl mt-4">
            <h2>Username: {username.toUpperCase()}</h2>
            <h2>Email: {email}</h2>
          </div>

          <div className="buttons my-6">
            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
