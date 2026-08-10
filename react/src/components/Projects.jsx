function Projects() {
  const projects = [
    {
      title: "FraudShield AI",
      description:
        "An AI-powered fraud intelligence and APK investigation system designed to analyze suspicious Android applications and identify potential banking threats.",
      tech: "Python, AI/ML, APK Analysis, Threat Intelligence"
    },
    {
      title: "AI-Powered Survey Intelligence Platform",
      description:
        "An intelligent survey platform that cleans student data, identifies communities using clustering, generates recommendations, and produces automated reports.",
      tech: "React, Node.js, PostgreSQL, Python, FastAPI, Machine Learning"
    },
    {
      title: "CampusConnect",
      description:
        "An attendance governance system that manages RSVP, attendance, no-show detection, grace requests, faculty review, notifications, and attendance escalation.",
      tech: "React, Node.js, PostgreSQL, Prisma"
    }
  ];

  return (
    <section className="section">
      <h2>My Projects</h2>

      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <p>
            <strong>Technologies:</strong> {project.tech}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Projects;
