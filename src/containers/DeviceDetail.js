import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DeviceDetailSelect, DeviceImage, OrderSummary } from '../components';

const GET_DEVICE = gql`
  query Device($device_id: String!) {
    device(device_id: $device_id) {
      device_id
      device_name
      model_name
      factory_price
      colors
      storages
      vendors
    }
  }
`;
class DeviceDetail extends Component {
  state = {
    vendor: '',
    storage: '',
    color: '',
    amount: 0,
  };

  handleSelect = field => value => {
    this.setState({
      [field]: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  }

  summarizeOption = () => {
    const { vendor, storage, color } = this.state;
    if (!vendor || !storage || !color) return '';
    return [vendor, storage, color].join(' / ');
  };

  render() {
    const { deviceId } = this.props;
    const { amount } = this.state;
    return (
      <Query
        query={GET_DEVICE}
        variables={{ device_id: deviceId }}
        skip={!deviceId}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>{error}</div>;
          }
          const { device } = data;
          return (
            <div>
              <Grid container justify="center" spacing={40}>
                <Grid item>
                  <DeviceImage device_name={device.device_name} width={600} />
                </Grid>
                <Grid item xs={4}>
                  <DeviceDetailSelect device={device} handleSelect={this.handleSelect} options={this.state} />
                  <OrderSummary text={this.summarizeOption()} amount={amount} handleChange={this.handleChange} price={device.factory_price} />
                  <Grid>
                    <Button variant="contained" fullWidth style={{ backgroundColor: '#007bff' }} color="primary">
                      Buy
                    </Button>
                    <Button variant="contained" color="primary" fullWidth>
                      Add to cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {device.model_name}
            </div>
          );
        }}
      </Query>
    );
  }
}

DeviceDetail.propTypes = {
  deviceId: PropTypes.string,
};

export default DeviceDetail;
