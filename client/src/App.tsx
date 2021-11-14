import React from "react";
import { Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserPage from "./components/UserPage";
import HomePage from "./components/HomePage";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:uuid" element={<UserPage />} />
        <Route path="/reviews/id/:id" element={<ReviewPage />} />
      </Routes>
    </>
  );
}

export default App;
