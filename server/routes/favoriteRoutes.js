const express = require("express");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/:providerId", protect, addFavorite);
router.delete("/:providerId", protect, removeFavorite);

module.exports = router;