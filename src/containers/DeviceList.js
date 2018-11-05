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

class DeviceList extends Component {
  state = {
    pageNum: 1,
  }

  handlePage = (page) => {
    this.setState({ pageNum: page });
  }

  render() {
    const { pageNum } = this.state;
    return (
      <Query
        query={GET_DEVICES}
        variables={{ page_num: pageNum }}
      >
        {({ data, loading, error }) => {
          if (error) return <div>Error! {error.message}</div>;
          if (loading) return <div>...loading</div>;

          return (
            <React.Fragment>
              <Grid container spacing={24}>
                {data.devices.map((info, i) => (
                  <Grid item xs={4} key={`device_thumb_${i}`}>
                    <DeviceThumb info={info} />
                  </Grid>
                ))}
              </Grid>
              <Pagination handlePage={this.handlePage} page={pageNum} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
export default DeviceList;
