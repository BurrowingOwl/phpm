import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = {
  container: {
    borderBottom: '1px solid #eee',
    boxShadow: 'none',
    top: 49,
  },
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const offset = window.pageYOffset;
    if (offset >= 200) {
      this.setState({ fixed: true });
    }
    else {
      this.setState({ fixed: false });
    }
  }

  render() {
    const { classes } = this.props;
    const { fixed } = this.state;
    return (
      <AppBar position={fixed ? 'fixed' : 'static'} color="inherit" className={classes.container}>
        <Toolbar variant="dense">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Button>GALAXY NOTE 9</Button>
          <Button>GALAXY S9</Button>
          <Button>GALAXY NOTE 10</Button>
          <Button>GALAXY NOTE 11</Button>
          <Button>GALAXY NOTE 12</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
