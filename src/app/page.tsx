"use client"

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AgentList } from "../components/AgentsList/AgentsList";
import { AgentDetail } from "../components/AgentDetail/AgentDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgentList />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
