import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { Overlay } from '.';

const styles = {
  mediaContainer: {
    position: 'relative',
  },
  cardActionArea: {
    width: '100%',
  },
  cardMedia: {
    height: 250,
    margin: 10,
  },
};

class DeviceThumb extends Component {
  render() {
    const { info, classes } = this.props;
    return (
      <Card>
        <CardActionArea
          className={classes.cardActionArea}
          onClick={() => { navigate(`device/${info.device_id}`); }}
        >
          <div className={classes.mediaContainer}>
            <CardMedia
              className={classes.cardMedia}
              image="https://res.cloudinary.com/doxv9v8tv/image/upload/v1540134838/devices/%EA%B0%A4%EB%9F%AD%EC%8B%9C%EB%85%B8%ED%8A%B89.png"
              title="Contemplative Reptile"
            />
            <Overlay factoryPrice={info.factory_price} deviceName={info.device_name} manufacturer={info.manufacturer} />
          </div>
          <CardContent>
            <Typography component="span">
              [{info.vendors.toString()}]
            </Typography>
            <Typography gutterBottom component="h2">
              {info.device_name}
            </Typography>
            <Typography component="p">
              {info.factory_price * 1000}원
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

DeviceThumb.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceThumb);
