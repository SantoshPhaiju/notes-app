import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNote } from "../redux/action-creators";
// import { getNote } from "../redux/action-creators";
import Notes from "./Notes";
import NotesItem from "./NotesItem";

const Home = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(Boolean);
  useEffect(() => {
    setLogin(true);
    // console.log(login);
    if (login === true) {
      setLogin(false);
      toast.success("Login successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (localStorage.getItem("token")) {
      // console.log("login successfull");
      setLogin(false);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let username = "";
  if (localStorage.getItem("token")) {
    const data = JSON.parse(localStorage.getItem("userData"));
    username = data.data.username.toUpperCase();
  }
  const dispatch = useDispatch();

  const getNotes = useSelector((state) => state.fetchAllNotes);
  console.log(getNotes);
  
  useEffect(() => {
    dispatch(getNote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() =>{
  //   const getNotes = async () =>{
  //     const token = JSON.parse(localStorage.getItem('token'));
  //     const response = await fetch("http://localhost:8000/api/notes/fetchallnotes", {
  //       method: "GET",
  //       headers: {
  //         "auth-token": token,
  //       }
  //     });
  //     const data = await response.json();
  //     if(data){
  //       setNotes(data.data);
  //       dispatch(getNote(data.data));
  //     }
  //   }
  //   getNotes();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="w-[75%] mx-auto">
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
      <h1 className="text-3xl my-4 font-sans text-purple-900 font-semibold text-center">
        Welcome Back {username}...
      </h1>
      <hr className="mb-6" />

      <Notes />
      {getNotes && getNotes.map((item) => {
        return <NotesItem key={item._id} data={item} />;
      })}
    </div>
  );
};

export default Home;
