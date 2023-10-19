const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = checkAuth