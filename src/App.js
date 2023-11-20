import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
    </Routes>
  </Router>
  );
}

export default App;
