import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 345,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'rgb(0, 0, 0, 0.4)',
    color: 'white',
    textAlign: 'center',
  },
  deviceName: {
    marginTop: 15,
    display: 'block',
    fontSize: '20px',
  },
  devicePrice: {
    marginTop: 10,
    fontSize: 15,
    display: 'block',
  },
};

const Overlay = ({ classes, deviceName, factoryPrice, manufacturer }) => (
  <div className={classes.container}>
    <strong className={classes.deviceName}>{manufacturer} {deviceName}</strong>
    <span className={classes.devicePrice}>출고가 {factoryPrice * 1000}원</span>
  </div>
);

Overlay.propTypes = {
  classes: PropTypes.object.isRequired,
  deviceName: PropTypes.string,
  factoryPrice: PropTypes.number,
  manufacturer: PropTypes.string,
};

export default withStyles(styles)(Overlay);
