const Favorite = require("../models/Favorite");

async function addFavorite(req, res) {
  try {
    const favorite = await Favorite.create({
      user: req.user._id,
      provider: req.params.providerId,
    });

    const populatedFavorite = await favorite.populate("provider");

    res.status(201).json({
      message: "Provider added to favorites",
      favorite: populatedFavorite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Provider is already in your favorites",
      });
    }

    res.status(400).json({
      message: "Unable to add favorite",
      error: error.message,
    });
  }
}

async function getFavorites(req, res) {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate("provider")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve favorites",
      error: error.message,
    });
  }
}

async function removeFavorite(req, res) {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      provider: req.params.providerId,
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      message: "Provider removed from favorites",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to remove favorite",
      error: error.message,
    });
  }
}

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};