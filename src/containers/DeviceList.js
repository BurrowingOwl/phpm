import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import { DeviceThumb } from '../components';

const GET_DEVICES = gql`
  {
    devices {
      device_name
      manufacturer
      factory_price
      vendors
    }
  }
`;

class DeviceList extends Component {
  render() {
    return (
      <Query query={GET_DEVICES}>
        {({ data, loading, error }) => {
          if (error) return <div>Error! {error.message}</div>;
          if (loading) return <div>...loading</div>;

          return (
            <Grid container spacing={24}>
              {data.devices.map((info, i) => (
                <Grid item xs={4} key={`device_thumb_${i}`}>
                  <DeviceThumb info={info} />
                </Grid>
              ))}
            </Grid>
          );
        }}
      </Query>
    );
  }
}
export default DeviceList;
