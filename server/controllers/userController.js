function getProfile(req, res) {
  res.status(200).json({
    message: "Profile retrieved successfully",
    user: req.user,
  });
}

module.exports = {
  getProfile,
};