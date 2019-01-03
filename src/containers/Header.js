import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, navigate } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Search } from '../components';
import { Drawer } from '.';

const styles = {
  container: {
    borderBottom: '1px solid #eee',
    boxShadow: 'none',
  },
};

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
    const { classes } = this.props;
    return (
      <AppBar color="inherit" position="fixed" className={classes.container}>
        <Query query={GET_LOGIN_STATE}>
          {
            ({ data: { loginStatus: { username, isLoggedIn } } }) => (
              <Toolbar variant="dense">
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
                {
                  !isLoggedIn && (
                    <Link to="signup" style={{ textDecoration: 'none' }}>
                      <Button>회원가입</Button>
                    </Link>
                  )
                }
                <Link to="devicelist" style={{ textDecoration: 'none' }}>
                  <Button>리스트</Button>
                </Link>
                {
                  isLoggedIn && (
                    <Link to="mypage" style={{ textDecoration: 'none' }}>
                      <Button>마이 페이지</Button>
                    </Link>
                  )
                }
                <div style={{ flexGrow: 1 }} />
                <Search />
                <Drawer />
              </Toolbar>
            )
          }
        </Query>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
