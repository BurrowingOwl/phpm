exports.typeDef = `
  extend type Query {
    device(device_id: String!): Device
  }
  type Device {
    device_id: String!
    model_name: String!
    device_name: String!
    colors: [String]!
    factory_price: Int!
    manufacturer: String!
    vendors: String!
    storages: [String]!
  }
`;

exports.resolver = {
  Query: {
    device: async (_, { device_id }, { db }) => {
      const res = await db.query('SELECT * FROM public.device WHERE public.device.device_id = $1', [device_id]);
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find device');
    },
  },
};
