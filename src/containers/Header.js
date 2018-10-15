import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, navigate } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Search } from '../components';

const GET_LOGIN_STATE = gql`
  {
    loginStatus @client {
      username
      isLoggedIn
    }
  }
`;
const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;
class Header extends React.Component {
  handleLogout = (logout, resetStore) => async () => {
    await logout();
    resetStore();
    navigate('/');
  }
  render() {
    return (
      <AppBar color="inherit" position="static">
        <Query query={GET_LOGIN_STATE}>
          {
            ({ data: { loginStatus: { username, isLoggedIn } } }) => (
              <Toolbar variant="dense">
                <IconButton>
                  <MenuIcon />
                </IconButton>
                {
                  isLoggedIn ? (
                    <Mutation mutation={LOGOUT}>
                      {
                        (logout, { client }) => (
                          <Fragment>
                            <Button>{username}</Button>
                            <Button onClick={this.handleLogout(logout, client.resetStore)}>로그아웃</Button>
                          </Fragment>
                        )
                      }
                    </Mutation>
                  ) : (
                    <Link to="login" style={{ textDecoration: 'none' }}>
                      <Button>로그인</Button>
                    </Link>
                  )
                }
                <Link to="signup" style={{ textDecoration: 'none' }}>
                  <Button>회원가입</Button>
                </Link>
                <Link to="devicelist" style={{ textDecoration: 'none' }}>
                  <Button>리스트</Button>
                </Link>
                <Button>마이 페이지</Button>
                <div style={{ flexGrow: 1 }} />
                <Search />
              </Toolbar>
            )
          }
        </Query>
      </AppBar>
    );
  }
}

export default Header;
