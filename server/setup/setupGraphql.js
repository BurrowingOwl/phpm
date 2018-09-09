const graphqlHTTP = require('express-graphql');
const schema = require('../graphql');

module.exports = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }));
};
