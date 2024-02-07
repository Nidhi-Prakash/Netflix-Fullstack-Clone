const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ msg: "Email parameter is missing." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res
        .status(404)
        .json({ msg: "User with the given email not found." });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;

      // Check if the movie is already liked
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (!movieAlreadyLiked) {
        // Update user with the new liked movie
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );

        // Internal server error if the update fails
        if (!updatedUser) {
          return res
            .status(500)
            .json({ error: "Internal server error while updating user data." });
        }
      } else {
        return res.json({ msg: "Movie already added to the liked list." });
      }
    } else {
      // Create a new user if not found
      await User.create({ email, likedMovies: [data] });
    }

    return res.json({ msg: "Movie successfully added to the liked list." });
  } catch (error) {
    // Handle other unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email });

    // Internal server error if the database query fails
    if (!user) {
      return res
        .status(500)
        .json({ error: "Internal server error while fetching user data." });
    }

    const movies = user.likedMovies;
    const movieIndex = movies.findIndex(({ id }) => id === movieId);

    // Check if the movie is not found
    if (movieIndex === -1) {
      return res.status(400).json({ msg: "Movie not found." });
    }

    // Remove the movie from the liked list
    movies.splice(movieIndex, 1);

    // Update user with the modified liked movies
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        likedMovies: movies,
      },
      { new: true }
    );

    // Internal server error if the update fails
    if (!updatedUser) {
      return res
        .status(500)
        .json({ error: "Internal server error while updating user data." });
    }

    return res.json({
      msg: "Movie successfully removed.",
      movies: updatedUser.likedMovies,
    });
  } catch (error) {
    // Handle other unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
