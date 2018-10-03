const jwt = require('jsonwebtoken');

const checkCookie = (req, res, next) => {
  const token = req.cookies.jwt;
  const handleInvalid = () => {
    res.clearCookie('jwt');
    req.userId = null;
    return next();
  };
  if (!token) {
    return handleInvalid();
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return handleInvalid();
    }
    req.userId = decoded.userId;
    return next();
  });
};

module.exports = {
  checkCookie,
};
