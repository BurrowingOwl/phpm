import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import { DeviceThumb, Pagination } from '../components';

const GET_DEVICES = gql`
  query Devices($page_num: Int!) {
    devices(page_num: $page_num) {
      device_id
      device_name
      manufacturer
      factory_price
      vendors
    }
  }
`;
const NUM_OF_DEVICES = gql`
  query NumOfDevices {
    numOfDevices {
      count
    }
  }
`;


class DeviceList extends Component {
  state = {
    pageNum: 0,
  }

  render() {
    const { pageNum } = this.state;
    return (
      <Query query={NUM_OF_DEVICES}>
        {({ data: { numOfDevices } }) => {
          if (!numOfDevices) return null;
          return (
            <Query
              query={GET_DEVICES}
              variables={{ page_num: pageNum }}
            >
              {({ data, error }) => {
                if (error) return <div>Error! {error.message}</div>;
                if (!data.devices) return null;
                return (
                  <React.Fragment>
                    <Grid container spacing={24} style={{ maxWidth: 750, margin: '0 auto' }}>
                      {data.devices.map((info, i) => (
                        <Grid item xs={4} key={`device_thumb_${i}`}>
                          <DeviceThumb info={info} />
                        </Grid>
                      ))}
                    </Grid>
                    <Pagination
                      handlePage={(i) => {
                        this.setState({ pageNum: i });
                      }} page={pageNum} lastPage={parseInt(numOfDevices.count / 12, 10)}
                    />
                  </React.Fragment>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
export default DeviceList;
