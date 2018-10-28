import React from 'react';
import Slider from 'react-slick';
import { BannerImage } from '../components';

const baseUrl = 'https://res.cloudinary.com/doxv9v8tv/image/upload/v1540715511/banners';
const Banner = ({ bannerCount = 5 }) => {
  const setting = {
    adaptiveHeight: true,
    arrow: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...setting}>
      {
        [...Array(bannerCount)].map((_, i) => (
          <BannerImage key={i} src={`${baseUrl}/${i + 1}.jpg`} number={i + 1} />
        ))
      }
    </Slider>
  );
};

export default Banner;
