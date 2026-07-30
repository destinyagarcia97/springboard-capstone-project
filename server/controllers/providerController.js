const Provider = require("../models/Provider");

// Create a new provider
async function createProvider(req, res) {
  try {
    const provider = await Provider.create(req.body);

    res.status(201).json({
      message: "Provider created successfully",
      provider,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to create provider",
      error: error.message,
    });
  }
}

// Get all providers with optional filters
async function getProviders(req, res) {
  try {
    const {
      city,
      category,
      acceptsMedicaid,
      acceptsMedicare,
      language,
      service,
    } = req.query;

    const filter = {};

    if (city) {
      filter.city = city;
    }

    if (category) {
      filter.category = category;
    }

    if (acceptsMedicaid !== undefined) {
      filter.acceptsMedicaid = acceptsMedicaid === "true";
    }

    if (acceptsMedicare !== undefined) {
      filter.acceptsMedicare = acceptsMedicare === "true";
    }

    if (language) {
      filter.languages = language;
    }

    if (service) {
      filter.services = service;
    }

    const providers = await Provider.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: providers.length,
      providers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve providers",
      error: error.message,
    });
  }
}

// Get one provider by ID
async function getProviderById(req, res) {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.status(200).json({
      provider,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to retrieve provider",
      error: error.message,
    });
  }
}

// Update a provider by ID
async function updateProvider(req, res) {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.status(200).json({
      message: "Provider updated successfully",
      provider,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to update provider",
      error: error.message,
    });
  }
}

// Delete a provider by ID
async function deleteProvider(req, res) {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.status(200).json({
      message: "Provider deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete provider",
      error: error.message,
    });
  }
}

module.exports = {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
};