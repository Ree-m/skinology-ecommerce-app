const jwt = require("jsonwebtoken");

const secret = "kj06d8eg4dbklpo3ie3u2x86k047gfbc7ny";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  jwt.verify(token, secret, {}, (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized." });
    }
    req.user = decodedToken;
    next();
  });
};

module.exports = isAuthenticated;
