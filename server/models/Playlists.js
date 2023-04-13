const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
