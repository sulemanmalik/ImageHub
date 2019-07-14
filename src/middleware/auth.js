const jwt = require("jsonwebtoken");

// valid expressjs middleware function profile
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.authenticated = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.authenticated = false;
    return next();
  }
  try {
    decodedToken = jwt.verify(token, "privatekey");
  } catch (err) {
    req.authenticated = false;
    return next();
  }

  if (!decodedToken) {
    req.authenticated = false;
    return next();
  }

  req.authenticated = true;
  req.userId = decodedToken.userId;
  next();
};
