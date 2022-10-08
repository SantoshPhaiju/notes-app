/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const dropRef2 = useRef();
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // eslint-disable-next-line

  const showResMenu = () => {
    setShowMenu(!showMenu);
  };

  const showDropdown2 = (e) => {
    setShow(!show);
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[2].className !== "dropDown") {
        setShow(false);
      }
    };
    document.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <header className="text-gray-600 body-font font-mono bg-slate-100">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:pl-10">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 md:mb-0"
          >
            <img
              src={logo}
              className="h-10 w-10"
              width={40}
              height={40}
              alt="Logo here"
            />
            <span className="ml-3 text-lg">My Notes App</span>
          </Link>
          <div
            className={`navbar md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-gray-400 md:flex md:flex-row md:items-center md:text-lg md:left-0 md:h-0 md:w-0 md:static duration-500 z-10 absolute ${
              showMenu ? "left-0" : "left-[-100%]"
            } w-full h-full bg-slate-100 top-20`}
          >
            <nav
              className={`flex flex-wrap items-center text-base justify-center md:block `}
            >
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

            <div className="buttons flex justify-center items-center md:absolute md:right-12 xl:right-20 2xl:right-36">
              {!localStorage.getItem("token") ? (
                <div className="noLoginBtns inline-block mr-2 space-x-2">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="dropDown" onClick={showDropdown2}>
                  <button className="inline-flex relative items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    <span className="mr-2">Account Info</span>
                    <AiFillCaretDown />
                  </button>
                </div>
              )}

              <AnimatePresence>
                {show && (
                  <motion.div
                    initial={{ opacity: 0, y: "-50%" }}
                    animate={{ opacity: 1, y: "5%" }}
                    exit={{ opacity: 0, y: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      duration: 0.5,
                    }}
                    className="accItems absolute top-24 w-48 bg-slate-50 rounded-md shadow-lg flex flex-col items-center justify-start gap-2 md:top-10 md:text-base"
                    ref={dropRef2}
                  >
                    <Link
                      to="/profile"
                      className="hover:bg-slate-200 py-2 px-6 rounded-md"
                    >
                      <MdAccountCircle className="inline-block mr-2 text-xl" />
                      Your Profile
                    </Link>
                    <button
                      className="hover:bg-slate-200 py-2 px-6 w-[100%] rounded-md"
                      onClick={handleLogout}
                    >
                      <TbLogout className="inline-block mr-2 text-xl" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div
            className="md:hidden space-y-1.5 hamburger"
            onClick={showResMenu}
          >
            {showMenu ? (
              <ImCross className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-3xl" />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
