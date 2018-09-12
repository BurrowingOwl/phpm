import React from 'react';
import { hot } from 'react-hot-loader';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USERS = gql`
  {
    users {
      user_id
      username
      password
    }
  }
`;
const App = () => (
  <Query query={GET_USERS}>
    {
      ({ data, loading, error }) => {
        if (error) return <div>Error! {error.message}</div>;
        if (loading) return <div>...loading</div>;

        return (
          <ul>
            {
              data.users.map(user => (
                <li key={user.user_id}>{user.username}</li>
              ))
            }
          </ul>
        );
      }
    }
  </Query>
);

export default hot(module)(App);
