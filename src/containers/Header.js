import React from 'react';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Search } from '../components';

class Header extends React.Component {
  render() {
    return (
      <AppBar color="inherit" position="static">
        <Toolbar variant="dense">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link to="login" style={{ textDecoration: 'none' }}>
            <Button>로그인</Button>
          </Link>
          <Link to="signup" style={{ textDecoration: 'none' }}>
            <Button>회원가입</Button>
          </Link>
          <Button>마이 페이지</Button>
          <div style={{ flexGrow: 1 }} />
          <Search />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
