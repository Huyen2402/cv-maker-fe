import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { RequireAuth } from "./guards/RequireAuth";
import MainLayout from "./components/layout/MainLayout";
import Template from "./pages/templates";
import AddCV from "./pages/cv/add-cv";
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
         <Route path="/my-cv/add" element=<AddCV/> />
         <Route path="/templates/list" element=<Template/> />
        <Route path="/login" element=<Login /> />
      </Routes>
    </Router>
  );
}

export default App;
