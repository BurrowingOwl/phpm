const { makeExecutableSchema } = require('graphql-tools');
const { typeDef: User, resolver: userResolver } = require('./User');
const { typeDef: Device, resolver: deviceResolver } = require('./Device');
const { typeDef: Delivery, resolver: deliveryResolver } = require('./Delivery');
const { typeDef: Order, resolver: orderResolver } = require('./Order');
const { typeDef: PhonePlan, resolver: phonePlanResolver } = require('./PhonePlan');

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
  typeDefs: [rootQuery, rootMutaition, User, Device, Delivery, Order, PhonePlan],
  resolvers: [rootResolver, userResolver, deviceResolver, deliveryResolver, orderResolver, phonePlanResolver],
});
