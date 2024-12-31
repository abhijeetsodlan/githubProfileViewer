import React, { useState } from "react";
import axios from "axios";

const GitHubProfileViewer = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setError("");
      const profileResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      setProfile(profileResponse.data);
      setRepos(reposResponse.data);
    } catch (err) {
      setError("User not found");
      setProfile(null);
      setRepos([]);
    }
  };

  const openRepository = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Profile Viewer</h1>

      <div className="w-full max-w-md">
        <input
          type="text"
          className="w-full p-4 rounded-md bg-gray-800 text-white placeholder-gray-400 mb-4"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={fetchProfile}
          className="w-full bg-green-600 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {profile && (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-md mt-6">
          <img
            src={profile.avatar_url}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">
            {profile.name || "No Name Provided"}
          </h2>
          <p className="text-gray-400 text-center">
            {profile.bio || "No Bio Provided"}
          </p>
          <p className="text-gray-400 text-center mt-2">
            Followers: {profile.followers} | Following: {profile.following}
          </p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Repositories</h3>
          <div className="space-y-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-700 p-4 rounded-md flex flex-col"
              >
                <h4 className="font-semibold text-white">{repo.name}</h4>
                <p className="text-gray-400">
                  {repo.description || "No description"}
                </p>
                <p className="text-gray-400 mt-2">
                  ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </p>
                <button
                  onClick={() => openRepository(repo.html_url)}
                  className="bg-green-600 mt-2 py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  View Repository
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfileViewer;
