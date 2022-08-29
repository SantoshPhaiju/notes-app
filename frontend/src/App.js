import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="w-[88%] m-auto min-h-[93vh]">

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
