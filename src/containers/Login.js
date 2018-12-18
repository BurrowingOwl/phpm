import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Paper from '@material-ui/core/Paper';
// TODO: 모듈화

// 타입지정이 별 의미 없는 듯
const LOCAL_LOGIN = gql`
  mutation Login($user_id: String!, $password: String!) {
    login(user_id: $user_id, password: $password) @client
  }
`;
class Login extends Component {
  state = {
    user_id: '',
    password: '',
  }

  _handleLogin = (login) => async () => {
    const { user_id, password } = this.state;
    console.log(user_id, password);
    try {
      await login({ variables: { user_id, password } });
      navigate('/');
    }
    catch (err) {
      console.log(err);
      // error handling
    }
  }
  render() {
    return (
      <Paper style={{ flexGrow: 1, maxWidth: 600, margin: '0 auto', padding: 20, marginTop: 50 }}>
        <div>
          <TextField
            fullWidth
            id="input-with-icon-textfield"
            label="ID"
            onChange={e => this.setState({ user_id: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="input-with-icon-textfield"
            label="비밀번호"
            onChange={e => this.setState({ password: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Mutation mutation={LOCAL_LOGIN}>
          {
            login => (
              <Button
                variant="contained"
                color="primary" onClick={this._handleLogin(login)} fullWidth
                style={{ marginTop: 50 }}
              >
                Login
              </Button>
            )
          }
        </Mutation>
      </Paper>
    );
  }
}
export default Login;
