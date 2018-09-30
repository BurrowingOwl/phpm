exports.typeDef = `
  extend type Query {
    delivery(delivery_id: String!): Delivery
  }
  type Delivery {
    delivery_id: String!
    delivery_status: String!
    order_id: String!
    start_date: String
    expected_date: String
    end_date: String
    delivery_address: String!
    shipment_no: Int
  }
`;

exports.resolver = {
  Query: {
    delivery: async (_, { delivery_id }, { db }) => {
      const res = await db.query('SELECT * FROM public.delivery WHERE public.delivery.delivery_id = $1', [delivery_id]);
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find delivery');
    },
  },
};
