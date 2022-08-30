import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Header = () => {
  const dropRef = useRef();
  const dropRef2 = useRef();
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [login, setLogin] = useState(true);

  const showResMenu = () => {
    setShowMenu(!showMenu);
  };

  const showDropdown = (e) => {
    setShow(!show)
    console.log(show);
    console.log(dropRef.current.classList);
    if (show) {
      dropRef.current.classList.add("opacity-1");
      dropRef.current.classList.add("flex");
      dropRef.current.classList.remove("opacity-0");
      dropRef.current.classList.remove("hidden");
      dropRef2.current.classList.add("opacity-1");
      dropRef2.current.classList.add("flex");
      dropRef2.current.classList.remove("opacity-0");
      dropRef2.current.classList.remove("hidden");
    } else {
      dropRef.current.classList.remove("opacity-1");
      dropRef.current.classList.remove("flex");
      dropRef.current.classList.add("opacity-0");
      dropRef.current.classList.add("hidden");
      dropRef2.current.classList.remove("opacity-1");
      dropRef2.current.classList.remove("flex");
      dropRef2.current.classList.add("opacity-0");
      dropRef2.current.classList.add("hidden");
    }
  };

  const showDropdown2 = (e) =>{
    setShow(!show)
    console.log(show);
    if (show) {
      dropRef2.current.classList.add("opacity-1");
      dropRef2.current.classList.add("flex");
      dropRef2.current.classList.remove("opacity-0");
      dropRef2.current.classList.remove("hidden");
    } else {
      dropRef2.current.classList.remove("opacity-1");
      dropRef2.current.classList.remove("flex");
      dropRef2.current.classList.add("opacity-0");
      dropRef2.current.classList.add("hidden");
    }
  }
  return (
    <>
      <header className="text-gray-600 body-font font-mono bg-slate-100">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:ml-10">
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
          {/* className={`md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center`} */}
          <div className="navbar hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 md:flex  md:items-center md:text-base md:justify-between">
            <nav>
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

            <div className="buttons flex justify-center items-center absolute md:right-12 xl:right-20 2xl:right-36 xl">
              {!login ? (
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
                  <div>
                    <button
                      className="inline-flex relative items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                      onClick={showDropdown2}
                    >
                      <span className="mr-2">Account Info</span>
                      <AiFillCaretDown />
                    </button>
                  </div>
              )}

              <div
                className="accItems absolute top-10 w-48 bg-slate-50 rounded-md shadow-lg flex-col items-center justify-start gap-2 opacity-0 transition-all duration-300 ease-linear hidden"
                ref={dropRef2}
              >
                <Link
                  to="/"
                  className="hover:bg-slate-200 py-2 px-6 rounded-md"
                >
                  <MdAccountCircle className="inline-block mr-2 text-xl" />
                  Your Profile
                </Link>
                <button className="hover:bg-slate-200 py-2 px-6 w-[100%] rounded-md">
                  <TbLogout className="inline-block mr-2 text-xl" /> Logout
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-1.5 hamburger" onClick={showResMenu}>
            {showMenu ? (
              <ImCross className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-3xl" />
            )}
          </div>
        </div>
      </header>

      <div
        className={`z-10 absolute w-full h-full bg-slate-100 duration-500 ${
          showMenu ? "left-0" : "left-[-100%]"
        }`}
      >
        <nav
          className={`md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center `}
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

        <div className="buttons mt-4 flex justify-center">
          {!login ? (
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
            <>
              <div>
                <button
                  className="inline-flex relative items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  onClick={showDropdown}
                >
                  <span className="mr-2">Account Info</span> <AiFillCaretDown />
                </button>
              </div>
              <div
                className="accItems absolute top-24 bg-slate-50 rounded-md shadow-lg right-auto left-auto  flex-col items-center justify-start gap-2 opacity-0 transition-all duration-300 ease-linear hidden md:right-4 md:top-16 lg:right-20 lg:left-[70%] xl:right-[20%] xl:left-[70%]"
                ref={dropRef}
              >
                <Link
                  to="/"
                  className="hover:bg-slate-200 py-2 px-6 rounded-md"
                >
                  <MdAccountCircle className="inline-block mr-2 text-xl" />
                  Your Profile
                </Link>
                <button className="hover:bg-slate-200 py-2 px-6 w-[100%] rounded-md">
                  <TbLogout className="inline-block mr-2 text-xl" /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
