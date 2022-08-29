import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

const Header = () => {
  const dropRef = useRef();
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [login, setLogin] = useState(false);

  const showDropdown = (e) => {
    e.preventDefault();
    setShow(!show);
    if (show) {
      dropRef.current.classList.add("opacity-1");
      dropRef.current.classList.remove("opacity-0");
    } else {
      dropRef.current.classList.remove("opacity-1");
      dropRef.current.classList.add("opacity-0");
    }
  };
  return (
    <>
      <header className="text-gray-600 body-font shadow-lg mb-3 font-mono">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src={logo} width={40} height={40} alt="Logo here" />
            <span className="ml-3 text-2xl">My Notes App</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-900">
              About
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="buttons">
            {!login ? (
              <div className="noLoginBtns inline-block mr-2 space-x-2">
                <Link to='/login' className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Login
                </Link>
                <Link to="/register" className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                  Register
                </Link>
              </div>
            ) : (
              <div>
                <button
                  className="inline-flex relative items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  onClick={showDropdown}
                >
                  <span className="mr-2">Account Info</span> <AiFillCaretDown />
                </button>{" "}
              </div>
            )}
          </div>

          <div
            className="accItems absolute top-16 bg-slate-50 rounded-md shadow-lg right-5 flex flex-col items-center justify-start gap-2 opacity-0 transition-all duration-300 ease-linear"
            ref={dropRef}
          >
            <Link to="/" className="hover:bg-slate-200 py-2 px-6 rounded-md">
              <MdAccountCircle className="inline-block mr-2 text-xl" />
              Your Profile
            </Link>
            <button className="hover:bg-slate-200 py-2 px-6 w-[100%] rounded-md">
              <TbLogout className="inline-block mr-2 text-xl" /> Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
