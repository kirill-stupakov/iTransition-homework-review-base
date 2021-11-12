import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserPage from "./components/UserPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:uuid" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
