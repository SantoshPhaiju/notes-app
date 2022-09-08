import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(Boolean);
  useEffect(() => {
    setLogin(true);
    console.log(login);
    if(login === true){
      setLogin(false);
      toast.success(
        "Login successfull",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
    if (localStorage.getItem("token")) {
      console.log("login successfull");
      setLogin(false);
    } else {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let username = "";
  if (localStorage.getItem("token")) {
    const data = JSON.parse(localStorage.getItem("userData"));
    username = data.data.username;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-3xl font-semibold text-center">
        {" "}
        Welcome {username}{" "}
      </h1>
      This is the home page here okey docks
    </div>
  );
};

export default Home;
