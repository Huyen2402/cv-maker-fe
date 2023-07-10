import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { RequireAuth } from "./guards/RequireAuth";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element=<MainLayout />>
          <Route
            path="/"
            element=<RequireAuth>
              <Home />
            </RequireAuth>
          />
        </Route>
        <Route path="/login" element=<Login /> />
      </Routes>
    </Router>
  );
}

export default App;
