const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const isAuthenticated = require("../middleware/isAuthenticated");
const spotifyController = require("../controllers/spotifyController");

router.post("/register", UserController.registerUser);
router.get("/", isAuthenticated, UserController.getUsers);
router.get("/:id", isAuthenticated, UserController.getUserById);
router.post("/login", UserController.checkUser);
router.post("/spotify/callback", spotifyController.handleSpotifyCallback);
router.get(
  "/me",
  // isAuthenticated,
  UserController.authMiddleware,
  UserController.getUserFromToken
);
router.get("/spotify/authorize", spotifyController.authorizeSpotify);

module.exports = router;
