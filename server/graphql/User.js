exports.typeDef = `
  extend type Query {
    user(user_id: String!): User
    users: [User]
  }
  type User {
    user_id: String!
    username: String!
    password: String!
  }
`;

exports.resolver = {
  Query: {
    user: async (_, { user_id }, { db }) => {
      const res = await db.query('SELECT * FROM public.user WHERE public.user.user_id = $1', [user_id]);
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find user');
    },
    users: async (_, __, { db }) => {
      const res = await db.query('SELECT * FROM public.user');
      return res.rows;
    },
  },
};
