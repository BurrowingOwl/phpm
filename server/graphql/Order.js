exports.typeDef = `
  extend type Query {
    order(order_id: String!): Order
  }
  type Order {
    order_id: String!
    device_id: String!
    user_id: String!
    order_date: String
  }
`;

exports.resolver = {
  Query: {
    order: async (_, { order_id }, { db }) => {
      const res = await db.query('SELECT * FROM public.order WHERE public.order.order_id = $1', [order_id]);
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find order');
    },
  },
};
