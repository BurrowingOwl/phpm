const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  type AuthPayload {
    token: String
    user: User
  }

  extend type Mutation {
    login(user_id: String!, password: String!): AuthPayload,
    signup(user_id: String!, password: String!, username: String!, phone: String!, email: String!, zip_code: String, address: String): AuthPayload
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
    users: async (_, __, { db, userId }) => {
      const res = await db.query('SELECT * FROM public.user');
      return res.rows;
    },
  },
  Mutation: {
    login: async (_, { user_id, password }, { db, cookie }) => {
      const { rows: user } = await db.query(
        'SELECT * FROM public.user WHERE public.user.username = $1',
        [user_id],
      );
      if (!user) {
        throw new Error('No such user found');
      }
      // const valid = await bcrypt.compare(password, user[0].password);
      // if (!valid) {
      //   throw new Error('Invalid password');
      // }
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
      const option = {
        maxAge: 1000 * 3600 * 24, // 1일 후 만료
        httpOnly: true, // web server에 의해서만 접근 가능
      };
      cookie('jwt', token, option);
      return {
        token,
        user,
      };
    },
    signup: (
      _,
      { user_id, password, username, phone, email, zip_code, address },
      { db },
    ) => {
      const res = db.query(
        'INSERT INTO public.user (user_id, password, username, phone, email, zip_code, address ) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [user_id, password, username, phone, email, zip_code, address],
      );
      return {
        token: jwt.sign({ userId: user_id }, process.env.JWT_SECRET),
        res,
      };
    },
  },
};
