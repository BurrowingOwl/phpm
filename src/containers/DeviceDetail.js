import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { DeviceDetailSelect, DeviceImage } from '../components';

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
const DeviceDetail = ({ deviceId }) => (
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
              <DeviceDetailSelect device={device} />
            </Grid>
          </Grid>
          {device.model_name}
        </div>
      );
    }}
  </Query>
);

DeviceDetail.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default DeviceDetail;
