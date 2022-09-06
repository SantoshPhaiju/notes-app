import React, { useEffect } from 'react'
import {  } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log("done");
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let username = "";
  if(localStorage.getItem('token')){
    const data = JSON.parse(localStorage.getItem('userData'));
    username = data.data.username;
  }
  


  return (
    <div>
     <h1 className='text-3xl font-semibold text-center'> Welcome {username} </h1>
      This is the home page here okey docks
    </div>
  )
}

export default Home
