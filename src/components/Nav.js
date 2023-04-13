import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import scopes from "../config/spotifyScopes";

export const Nav = ({ user, setUser }) => {
  const scopesString = scopes.join(" ");

  // const [user, setUser] = useState(null);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/MockTeams" className="hover:text-blue-300">
            Drafts
          </Link>
          <Link to="/Stats" className="hover:text-blue-300">
            Stats
          </Link>
          <a
            href={`https://accounts.spotify.com/authorize?client_id=${
              process.env.REACT_APP_SPOTIFY_CLIENT_ID
            }&response_type=code&redirect_uri=${
              process.env.REACT_APP_REDIRECT_URL
            }&scope=${encodeURIComponent(scopesString)}`}
            className="hover:text-blue-300"
          >
            Spotify Redirect
          </a>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <div>
              <span className="text-white p-5">Welcome {user.name}!</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <>
              <Link
                to="/Login"
                className="bg-white px-4 text-black py-2 rounded border border-blue-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="bg-blue-400 px-4 py-2 rounded border border-blue-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
