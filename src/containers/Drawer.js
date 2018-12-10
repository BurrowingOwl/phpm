import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = {
  drawer: {
    position: 'relative',
  },
  list: {
    width: 280,
  },
  fullList: {
    width: 'auto',
  },
  fab: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 10,
    WebkitTransform: 'translateZ(0)',
  },
  card: {
    width: 280,
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
    const contactInfo = (
      <div className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            CONTEXT
          </Typography>
          <Typography component="p">
            010-8844-1245 / xxxx-xxxx
          </Typography>
          <Typography component="p">
            AM 10:00 - PM 6:00 Everyday
          </Typography>
        </CardContent>
      </div>
    );
    const bankInfo = (
      <div className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            BANK INFO
          </Typography>
          <Typography component="p">
            우리 1002-182-xxxxxx
          </Typography>
          <Typography component="p">
            예금주 박혁
          </Typography>
        </CardContent>
      </div>
    );
    const { open } = this.state;
    return (
      <div className={classes.drawer}>
        <IconButton onClick={this.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
        <SwipeableDrawer
          open={open}
          anchor="right"
          variant="persistent"
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.toggleDrawer}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
            <Divider />
            {contactInfo}
            <Divider />
            {bankInfo}
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
