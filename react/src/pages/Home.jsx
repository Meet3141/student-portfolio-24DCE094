import About from "../components/About";
import Skills from "../components/Skills";

function Home() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Machine Learning",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Git & GitHub"
  ];

  return (
    <>
      <About name="Meet" />

      <Skills skillList={skills} />
    </>
  );
}

export default Home;
