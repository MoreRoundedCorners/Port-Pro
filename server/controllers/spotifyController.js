const SpotifyWebApi = require("spotify-web-api-node");
const scopes = require("../../src/config/spotifyScopes");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

exports.authorizeSpotify = (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
};

exports.searchSpotify = () => {
  spotifyApi.searchTracks("All the Small Things").then(
    (data) => {
      console.log('Search tracks by "All the Small Things"', data.body);
    },
    (err) => {
      console.log("Something went wrong!", err);
    }
  );
};

exports.handleSpotifyCallback = async (req, res) => {
  try {
    const { code } = req.body;
    const data = await spotifyApi.authorizationCodeGrant(code);
    console.log(data);

    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;

    spotifyApi.setAccessToken(accessToken);

    const spotifyProfile = await spotifyApi.getMe();
    const spotifyId = spotifyProfile.body.id;

    let user = await User.findOne({ spotifyId });

    if (!user) {
      // Create a new user
      // Make sure to provide the required fields `name`, `email`, and `password`.
      // For example:
      const name = "User's name from registration or Spotify API";
      const email = "User's email from registration or Spotify API";
      const password = "User's password from registration";
      user = new User({
        name,
        email,
        password,
        spotifyId,
        accessToken,
        refreshToken,
      });
    } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
    }

    if (user) {
      await user.save();
      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(500).json({ error: "Failed to create or update user" });
    }
  } catch (error) {
    console.error(
      "Error handling Spotify callback:",
      error.message,
      error.stack
    );
    res.status(500).json({ error: "Failed to handle Spotify callback" });
  }
};
