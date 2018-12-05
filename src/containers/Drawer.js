import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  drawer: {
    position: 'relative',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  fab: {
    position: 'fixed',
    bottom: '30%',
    right: 30,
    zIndex: 10,
    WebkitTransform: 'translateZ(0)',
  },
};

class Drawer extends React.Component {
  state = {
    open: false,
  }
  toggleDrawer = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  render() {
    const { classes } = this.props;
    const addButton = (
      <Button onClick={this.toggleDrawer} color="primary" variant="fab" className={classes.fab}>
        <AddIcon />
      </Button>
    );
    const sideList = (
      <div className={classes.list}>
        <List>
          {['공지사항', '포토리뷰', '상품문의', 'contact'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['mail', '계좌', 'SNS'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    const { open } = this.state;
    return (
      <div className={classes.drawer}>
        { addButton }
        <SwipeableDrawer
          open={open}
          anchor="right"
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drawer);
