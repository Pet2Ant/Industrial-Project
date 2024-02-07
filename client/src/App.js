import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Apply from "./components/Apply/Apply";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Applications from "./components/Applications/Applications";
import CvBuilder from "./components/CvBuilder/CvBuilder.jsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { AppContext } from "./AppContext.js";

function App() {
  const [user, setUser] = useState('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUserKind = (userKind) => {
    setUser(userKind);
  };
  
  console.log(isLoading);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <div id="App" onLoad={() => setUserKind('user')} className="App font-noi">
        <Router>
          <Routes>
            {isLoading ? (
              <Route path="/LoadingSpinner" element={<LoadingSpinner />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={<MainPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/Register"
                  element={<Register setIsLoading={setIsLoading} />}
                />
                <Route
                  path="/Login"
                  element={
                    <Login
                      onLogin={() => setIsLoggedIn(true)}
                      setIsLoading={setIsLoading}
                    />
                  }
                />
                <Route path="/Apply" element={<Apply />} />
                <Route path="/Applications" element={<Applications />} />
                <Route path="/CvBuilder" element={<CvBuilder />} />
                <Route path="*" element={<ErrorPage />} />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
