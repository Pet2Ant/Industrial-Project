import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Apply from "./components/Apply/Apply";
import Applications from "./components/Applications/Applications";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import CVBuilder from './components/CvBuilder/CvBuilder';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  return (
    <Router>
      <Routes>
        {isLoading ? (
          <Route path="/LoadingSpinner" element={<LoadingSpinner />} />
        ) : (
          <>
            <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
            <Route path="/Register" element={<Register   setIsLoading={setIsLoading}/>} />
            <Route path="/Login" element={<Login onLogin={() => setIsLoggedIn(true)} setIsLoading={setIsLoading} />} />
            <Route path="/Apply" element={<Apply />} />
            <Route path="/Applications" element={<Applications />} />
            <Route path="/CVBuilder" element={<CVBuilder />} />
            <Route path="*" element={<ErrorPage />} />
            
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
