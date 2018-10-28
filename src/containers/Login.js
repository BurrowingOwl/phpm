import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// TODO: 모듈화

// 타입지정이 별 의미 없는 듯
const LOCAL_LOGIN = gql`
  mutation Login($user_id: String!, $password: String!) {
    login(user_id: $user_id, password: $password) @client
  }
`;
class Login extends Component {
  state = {
    isLoggedIn: false,
    user_id: '',
    password: '',
  }

  _handleLogin = (login) => async () => {
    const { user_id, password } = this.state;
    try {
      await login({ variables: { user_id, password } });
      navigate('/');
    }
    catch (err) {
      // error handling
    }
  }
  render() {
    const { isLoggedIn, user_id, password } = this.state;
    return (
      <div>
        <div>
          <input
            value={user_id}
            onChange={e => this.setState({ user_id: e.target.value })}
            type="text"
            placeholder="Your user name"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Your password"
          />
        </div>
        <Mutation mutation={LOCAL_LOGIN}>
          {
            login => (
              <div className="flex mt3">
                <div className="pointer mr2 button" onClick={this._handleLogin(login)}>
                  {isLoggedIn ? 'logout' : 'login'}
                </div>
              </div>
            )
          }
        </Mutation>
      </div>
    );
  }
}
export default Login;
