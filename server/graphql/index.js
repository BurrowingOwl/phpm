const { makeExecutableSchema } = require('graphql-tools');
const { typeDef: User, resolver: userResolver } = require('./User');

// _empty를 준 이유는 나중에 확장하더라도 타입이 empty면 안되기 때문에 임의로 준 값
const rootQuery = `
  type Query {
    _empty: String
  }
`;
const rootMutaition = `
  type Mutation {
    _empty: String
  }
`;

const rootResolver = {};

module.exports = makeExecutableSchema({
  typeDefs: [rootQuery, rootMutaition, User],
  resolvers: [rootResolver, userResolver],
});
