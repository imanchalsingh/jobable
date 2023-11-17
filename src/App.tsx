import React from "react";
import "./App.css";

import Loginpage from "./Component/Loginpage";
import PermanentDrawerLeft from "./Component/Searchapp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route
            path="job-description"
            element={<PermanentDrawerLeft />}
          ></Route>
          <Route path="*" element={<>Error 404</>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
