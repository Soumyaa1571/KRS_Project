import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Login from "./components/pages/Login/Login";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import SignUp from "./components/pages/SignUp/SignUp";
import Quizes from "./components/pages/Quizes/Quizes";
import Announcements from "./components/pages/Announcements/Announcements";
import Question from "./components/pages/Question form/Question form";
import Test from "./components/Tests/Test/Test1/Test";
import Test2 from "./components/Tests/Test/Test2/Test2";
import Test3 from "./components/Tests/Test/Test3/Test3";
import Finish from "./components/pages/end/Finish";
import Bform from "./components/Bform/Bform";
import Result from "./components/pages/Result/Result";
import Sheet from "./components/pages/Sheet/Sheet";
import Aform from "./components/Aform/Aform";

function App() {
  const obString = localStorage.getItem("userData");
  const obj = JSON.parse(obString);
  const [tokenState, setTokenState] = useState({
    token: obj?.token || null,
    email: obj?.email || null,
    role: obj?.role || null
  });
  return (
    <div>
      <Navbar tokenState={tokenState} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={tokenState.token ? <Quizes /> : <Login setTokenState={setTokenState}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quizes" element={tokenState.token ? <Quizes tokenState={tokenState} />: <Login/> } />
        <Route path="/Announcements" element={<Announcements />} />
        <Route path="/Questions" element={<Question />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Test2" element={<Test2 />} />
        <Route path="/Test3" element={<Test3 />} />
        <Route path="/Finish" element={<Finish />} />
        <Route path="/exam" element={<Bform />} />
        <Route path="/result" element={<Result />} />
        <Route path="/Sheet" element={<Sheet />} />
        <Route path="/getSheet" element={<Aform />} />
      </Routes>
    </div>
  );
}

export default App;
