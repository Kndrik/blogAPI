import Sidebar from "./components/Sidebar";
import LogIn from "./pages/LogIn";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Redirect</div>} />
          <Route path="/dashboard/*" element={<div>Dashboard</div>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<div>Sign up</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
