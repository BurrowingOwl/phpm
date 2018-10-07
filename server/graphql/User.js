const bcrypt = require('bcrypt');

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

  type SignupPayload {
    user: User
  }

  input SignupInput {
    user_id: String!
    password: String!
    username: String!
    phone: String!
    email: String!
    zip_code: String
    address: String
  } 

  extend type Mutation {
    signup(userInput: SignupInput): SignupPayload
  }
`;

exports.resolver = {
  Query: {
    user: async (_, { user_id }, { db }) => {
      const res = await db.query(
        'SELECT * FROM public.user WHERE public.user.user_id = $1',
        [user_id],
      );
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
  Mutation: {
    signup: async (
      _,
      { userInput },
      { db },
    ) => {
      console.log('ff');
      const { user_id, password, username, phone, email, zip_code, address } = userInput;
      const hashed_password = await bcrypt.hash(password, 10);
      const { rows } = await db.query(
        'INSERT INTO public.user (user_id, password, username, phone, email, zip_code, address ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [user_id, hashed_password, username, phone, email, zip_code, address],
      );
      return {
        user: rows[0],
      };
    },
  },
};
