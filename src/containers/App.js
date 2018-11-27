import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { hot } from 'react-hot-loader';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Home, Header, Login, SignUp, DeviceDetail, DeviceList, Drawer } from '.';
import { Logo } from '../components';

const VERIFY_USER = gql`
  mutation VerifyUser {
    verify @client
  }
`;
const MainContainer = styled.div`
  margin-top: 1rem;
`;

class VerifyUser extends React.Component {
  state = {
    verified: false,
  };
  componentDidMount() {
    const { verifyUser } = this.props;
    verifyUser().then(() => this.setState({ verified: true }));
  }
  render() {
    const { verified } = this.state;
    const { children } = this.props;
    if (!verified) {
      return null;
    }
    return <div>{children}</div>;
  }
}
VerifyUser.propTypes = {
  children: PropTypes.node.isRequired,
  verifyUser: PropTypes.func.isRequired,
};

const App = () => (
  <Mutation mutation={VERIFY_USER}>
    {verifyUser => (
      <VerifyUser verifyUser={verifyUser}>
        <Header />
        <Logo />
        <Drawer />
        <Router>
          <MainContainer path="/">
            <Home path="/" />
            <Login path="/login" />
            <SignUp path="/signup" />
            <DeviceDetail path="device/:deviceId" />
            <DeviceList path="/devicelist" />
          </MainContainer>
        </Router>
      </VerifyUser>
    )}
  </Mutation>
);

export default hot(module)(App);
