const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    return res.status(401).send("Unauthorized access");
  } else {
    next(); // this will pass the control to the next route handler
  }
};

module.exports = {
  adminAuth,
};
