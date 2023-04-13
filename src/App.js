import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { SignUp } from "./components/SignUp";
import { useState } from "react";
import { Login } from "./components/Login";
import HomePage from "./components/HomePage";
import Callback from "./components/Callback";

// Inside your App function component

// import Stats from "./Stats";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <Nav user={user} setUser={setUser} />

        {/* routes for user to be redirected to proper place */}
        <Routes>
          <Route exact path="/" element={<HomePage user={user} />} />

          {/* <Route path="/Stats" element={<Stats />} /> */}
          <Route path="/SignUp" element={<SignUp setUser={setUser} />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
