import React from 'react';
import PropTypes from 'prop-types';

const BannerImage = ({ src, number }) => (
  <div>
    <img src={src} alt={`banner${number}`} width="100%" />
  </div>
);

BannerImage.propTypes = {
  number: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
};

export default BannerImage;
