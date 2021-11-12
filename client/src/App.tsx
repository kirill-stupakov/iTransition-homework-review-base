import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";

import TopBar from "./components/TopBar";
import UserPage from "./components/UserPage";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/users/:uuid" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
