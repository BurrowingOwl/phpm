import React from 'react';

/* eslint-disable */
const baseUrl =
  'https://res.cloudinary.com/doxv9v8tv/image/upload/v1540134838/devices';
const DeviceImage = ({ device_name, ...props }) => {
  return <img src={`${baseUrl}/${device_name}.png`} alt="device" {...props} />;
};

export default DeviceImage;
