const TestData = [
  {
    id: 'user1',
    name: 'Lee Taehee',
  },
  {
    id: 'user2',
    name: 'Kim yuyeong',
  },
];

exports.typeDef = `
  extend type Query {
    user(id: String!): User
    users: [User]
  }
  type User {
    id: String!
    name: String!
  }
`;

exports.resolver = {
  Query: {
    user: (_, { id }) => TestData.find(item => item.id === id),
    users: () => TestData,
  },
};
