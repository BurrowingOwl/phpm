import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { login } from '../api/auth';

class Login extends Component {
  state = {
    isLoggedIn: false,
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
  _handleLogin = async () => {
    const { user_id, password } = this.state;
    try {
      await login({ user_id, password });
      this.setState({
        isLoggedIn: true,
      });
    }
    catch (err) {
      console.error(err);
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
        <div className="flex mt3">
          <div className="pointer mr2 button" onClick={this._handleLogin}>
            {isLoggedIn ? 'logout' : 'login'}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
