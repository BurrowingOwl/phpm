exports.typeDef = `
  extend type Query {
    device(device_id: String!): Device
    devices(page_num: Int!): [Device]
    numOfDevices: Number
  }
  type Device {
    device_id: String!
    model_name: String!
    device_name: String!
    colors: [String]!
    factory_price: Float!
    manufacturer: String!
    vendors: [String]!
    storages: [String]!
  },
  type Number {
    count: Int!
  }
`;

exports.resolver = {
  Query: {
    device: async (_, { device_id }, { db }) => {
      const res = await db.query(
        'SELECT * FROM public.device WHERE public.device.device_id = $1',
        [device_id],
      );
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find device');
    },
    devices: async (_, { page_num }, { db }) => {
      const res = await db.query(`SELECT * FROM public.device LIMIT 12 OFFSET ${page_num * 12}`);
      return res.rows;
    },
    numOfDevices: async (_, __, { db }) => {
      const res = await db.query('select count(*) from public.device');
      return res.rows[0];
    }
  },
};
