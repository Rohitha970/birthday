import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Memories from "./pages/Memories";
import Celebration from "./pages/Celebration";
import Surprise from "./pages/Surprise";

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
          ⚠ Something went wrong!
          <br />
          {this.state.errorMessage}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/celebration" element={<Celebration />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
