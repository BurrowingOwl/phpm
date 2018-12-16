import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';

const styles = {
  root: {
    padding: 20,
  },
  cardThumb: {
    width: 100,
    height: 100,
    float: 'left',
    marginRight: 20,
  },
  userName: {
    borderBottom: '1px solid #e7e7e7',
    paddingBottom: 20,
    marginBottom: 10,
  },
  userInfo: {
    flexGrow: 1,
  },
  userInfoWrap: {
    maxWidth: 500,
  },
  button: {
    margin: 10,
  },
  icon: {
    fontSize: 20,
  },
  cardContent: {
    overflow: 'hidden',
  },
};

const GET_LOGIN_STATE = gql`
  {
    loginStatus @client {
      username
      user_id
    }
  }
`;

class MyPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_LOGIN_STATE}>
        {
          ({ data: { loginStatus: { username, user_id } } }) => (
            <div className={classes.root}>
              <Card>
                <CardContent>
                  <CardMedia
                    image="http://www.upinews.kr/news/data/20181120/p1065582649095928_349_thum.jpg"
                    className={classes.cardThumb}
                  />
                  <div className={classes.cardContent}>
                    <Typography component="h3" variant="h3" className={classes.userName}>{username} [{user_id}]</Typography>
                    <Table className={classes.userInfoWrap}>
                      <TableHead>
                        <TableCell>회원등급</TableCell>
                        <TableCell>좋아요</TableCell>
                        <TableCell>적립금</TableCell>
                        <TableCell>구매건수</TableCell>
                      </TableHead>
                      <TableBody>
                        <TableCell>
                          <div>
                            <span>일반회원</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span>like it</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span>0원</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span>0건</span>
                          </div>
                        </TableCell>
                      </TableBody>
                    </Table>
                    <Button variant="contained" size="medium" className={classes.button} color="default">
                      <EditIcon className={classes.icon} />
                      Edit
                    </Button>
                    <Button variant="contained" size="medium" className={classes.button} color="default">
                      <PlaceIcon className={classes.icon} />
                      address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
      </Query>
    );
  }
}

MyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyPage);
