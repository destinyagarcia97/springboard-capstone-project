const express = require("express");

const {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} = require("../controllers/providerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProviders);
router.get("/:id", getProviderById);

// Protected routes
router.post("/", protect, createProvider);
router.put("/:id", protect, updateProvider);
router.delete("/:id", protect, deleteProvider);

module.exports = router;