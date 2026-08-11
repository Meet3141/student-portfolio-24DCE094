import { useEffect, useState } from "react";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const fetchRepositories = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/Meet3141/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }

        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <section className="section">
        <h2>My GitHub Projects</h2>

        <div className="loading">
          Loading repositories...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2>My GitHub Projects</h2>

        <p className="error">
          Error: {error}
        </p>

        <button onClick={fetchRepositories}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>My GitHub Projects</h2>

      <p>
        Projects fetched directly from GitHub.
      </p>

      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredRepos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <div className="repository-list">
          {filteredRepos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>

              <p>
                {repo.description ||
                  "No description available."}
              </p>

              <p>
                ⭐ Stars: {repo.stargazers_count}
              </p>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
