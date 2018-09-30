exports.typeDef = `
  extend type Query {
    phonePlan(plan_id: String!): PhonePlan
  }
  type PhonePlan {
    plan_id: String!
    plan_name: String!
    telecom: String!
    plan_fee: Int!
    data_amount: Int!
    call_amount: Int!
    text_message: Int!
  }
`;

exports.resolver = {
  Query: {
    phonePlan: async (_, { plan_id }, { db }) => {
      const res = await db.query('SELECT * FROM public.phone_plan WHERE public.phone_plan.plan_id = $1', [plan_id]);
      if (res.rows) {
        return res.rows[0];
      }
      throw new Error('Fail to find phone plan');
    },
  },
};
