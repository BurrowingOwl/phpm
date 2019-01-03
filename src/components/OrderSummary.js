import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const styles = {
  text: {
    whiteSpace: 'nowrap',
    width: '50%',
  },
  cell: {
    width: '25%',
  },
};

class OrderSummary extends React.Component {
  render() {
    const { text, amount, handleChange, classes, price } = this.props;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.text}>상품명</TableCell>
              <TableCell className={classes.cell}>
                수량
              </TableCell>
              <TableCell className={classes.cell}>가격</TableCell>
            </TableRow>
          </TableHead>
          {
            text && (
              <TableBody>
                <TableCell>{text}</TableCell>
                <TableCell>
                  <TextField
                    id="filled-number"
                    value={amount}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    readOnly={true}
                    style={{ width: '100%' }}
                  />
                </TableCell>
                <TableCell>${price * amount}</TableCell>
              </TableBody>
            )
          }
        </Table>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  amount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};


export default withStyles(styles)(OrderSummary);
