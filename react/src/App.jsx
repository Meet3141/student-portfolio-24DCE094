import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Machine learning",
    "Node.js",
    "Express.js",
    "Git & GitHub"
  ];

  return (
    <div>
      <Header
        name="Meet"
        themeColor="#2563eb"
      />

      <About name="Meet" />

      <Skills skillList={skills} />

      <Footer email="meet@example.com" />
    </div>
  );
}

export default App;
