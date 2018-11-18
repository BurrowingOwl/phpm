import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const styles = theme => ({
  root: {
    textAlign: 'center',
    margin: '30px 0',
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
  pagenum: {
    fontSize: 15,
    fontWeight: 400,
  },
});

class Pagination extends React.Component {
  render() {
    const { classes, page, handlePage, lastPage } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={() => handlePage(1)}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={() => handlePage(page - 1)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <span className={classes.pagenum}>{page}</span>
        <IconButton
          onClick={() => handlePage(page + 1)}
          disabled={page === lastPage}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={() => handlePage(lastPage)}
          disabled={page === lastPage}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
