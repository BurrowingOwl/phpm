import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { hot } from 'react-hot-loader';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Login, SignUp, DeviceList } from '.';
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
const VERIFY_USER = gql`
  mutation VerifyUser {
    verify @client
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
class VerifyUser extends React.Component {
  state = {
    verified: false,
  }
  componentDidMount() {
    const { verifyUser } = this.props;
    verifyUser()
      .then(() => this.setState({ verified: true }));
  }
  render() {
    const { verified } = this.state;
    const { children } = this.props;
    if (!verified) {
      return null;
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}
VerifyUser.propTypes = {
  children: PropTypes.node.isRequired,
  verifyUser: PropTypes.func.isRequired,
};

const App = () => (
  <Mutation mutation={VERIFY_USER}>
    {
      verifyUser => (
        <VerifyUser verifyUser={verifyUser}>
          <Header />
          <Logo />
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <SignUp path="/signup" />
            <DeviceList path="/devicelist" />
          </Router>
        </VerifyUser>
      )
    }
  </Mutation>
);

export default hot(module)(App);
