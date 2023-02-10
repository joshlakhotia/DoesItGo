import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SubmitLaunch } from "./pages/SubmitLaunch";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { LaunchPage } from "./pages/LaunchPage";
import { EditLaunch } from "./pages/EditLaunch";

import "./App.css";

function App() {
  const [state, setState] = useState("Utah");
  const [id, setId] = useState();

  return (
    <>
      <NavBar />
      <div className="main-page">
        <SideBar setState={setState} state={state}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home id={id} state={state} setId={setId} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submitlaunch" element={<SubmitLaunch />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/launch/:id" element={<LaunchPage id={id}/>} />
            <Route path="/editlaunch/:id" element={<EditLaunch id={id} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;
