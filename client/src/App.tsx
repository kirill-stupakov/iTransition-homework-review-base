import React from "react";
import { Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserPage from "./components/UserPage";
import HomePage from "./components/HomePage";
import ReviewPage from "./components/ReviewPage";
import CreateReview from "./components/CreateReview";
import AdminPanel from "./components/AdminPanel";
import EditReview from "./components/EditReview";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:uuid" element={<UserPage />} />
        <Route path="/reviews/id=:id" element={<ReviewPage />} />
        <Route path="/createReview/:authorUUID" element={<CreateReview />} />
        <Route path="/editReview/:id" element={<EditReview />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
