const graphqlHTTP = require('express-graphql');
const schema = require('../graphql');

module.exports = (app, context = {}) => {
  app.use('/graphql',
    graphqlHTTP({
      schema,
      context,
      graphiql: process.env.NODE_ENV === 'development',
    })
  );
};
