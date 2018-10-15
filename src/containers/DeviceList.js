import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// TODO: 모듈화

const GET_DEVICES = gql`
  {
    devices {
      device_name
      manufacturer
      factory_price
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
            <ul>
              {data.devices.map(device => (
                <li key={device.device_name}>[{device.manufacturer}]{device.device_name} - ${device.factory_price}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}
export default DeviceList;
