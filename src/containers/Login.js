import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation Login($user_id: String!, $password: String!) {
    login(user_id: $user_id, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    login: false,
    user_id: '',
    password: '',
  }
  _confirm = async data => {
    const { token } =  data.login;
    this._saveUserData(token);
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { login, user_id, password } = this.state;
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
        <div className="flex mt3">
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ user_id, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'logout' : 'login'}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
export default Login;
