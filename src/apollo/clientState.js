import * as authApi from '../api/auth';

// TODO: 모듈화

const defaults = {
  loginStatus: {
    __typename: 'LoginStatus',
    isLoggedIn: false,
    user_id: '',
    username: '',
    // ...
  },
};

const resolvers = {
  Mutation: {
    login: async (_, { user_id, password }, { cache }) => {
      try {
        const { data } = await authApi.login({ user_id, password });
        const { user } = data;
        cache.writeData({
          data: {
            loginStatus: {
              __typename: user.user_id,
              isLoggedIn: true,
              ...user,
            },
          },
        });
        return true;
      }
      catch (err) {
        // error handling
        return false;
      }
    },
    logout: async () => {
      await authApi.logout();
      return null;
    },
    verify: async (_, __, { cache }) => {
      try {
        const { data } = await authApi.verify();
        const { verified, user } = data;
        if (!verified) {
          return null;
        }
        cache.writeData({
          data: {
            loginStatus: {
              __typename: user.user_id,
              isLoggedIn: true,
              ...user,
            },
          },
        });
      }
      catch (err) {
        // error handling
      }
      return null;
    },
  },
};

const clientState = {
  defaults,
  resolvers,
};

export default clientState;
