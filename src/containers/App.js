import React from 'react';
import { Router } from '@reach/router';
import { hot } from 'react-hot-loader';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Login, SignUp } from '.';
import { Logo } from '../components';

const GET_USERS = gql`
  {
    users {
      user_id
      username
      password
    }
  }
`;
const Home = () => (
  <Query query={GET_USERS}>
    {({ data, loading, error }) => {
      if (error) return <div>Error! {error.message}</div>;
      if (loading) return <div>...loading</div>;

      return (
        <ul>
          {data.users.map(user => (
            <li key={user.user_id}>{user.username}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);
const App = () => (
  <div>
    <Header />
    <Logo />
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <SignUp path="/signup" />
    </Router>
  </div>
);

export default hot(module)(App);
