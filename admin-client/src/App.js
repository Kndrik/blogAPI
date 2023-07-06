import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<div>Sign up</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
