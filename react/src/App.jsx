import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Projects from "./components/Projects";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <div>


      <NavBar name="Meet" />

      <main>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </main>

      <Footer email="meet@example.com" />
    </div>
  );
}

export default App;
