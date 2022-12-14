import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ToastState from "./components/context/ToastState";

const App = () => {
  return (
    <>
    <ToastState>

      <Router>
        <Header />
        <div className="w-[88%] m-auto min-h-[93vh]">

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/forgetpassword" element={<ForgetPassword />}></Route>
          <Route exact path="/resetpassword/:resetToken" element={<ResetPassword />}></Route>
        </Routes>
        </div>
        <Footer />
      </Router>
    </ToastState>
    </>
  );
};

export default App;
