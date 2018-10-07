const graphqlHTTP = require('express-graphql');
const jwt = require('jsonwebtoken');
const schema = require('../graphql');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  const handleInvalid = () => {
    res.clearCookie('jwt');
    req.userId = null;
    next();
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

module.exports = (app, context = {}) => {
  app.use(
    '/graphql',
    authMiddleware,
    graphqlHTTP(req => ({
      schema,
      context: { ...context, userId: req.userId },
      graphiql: process.env.NODE_ENV === 'development',
    })),
  );
};
