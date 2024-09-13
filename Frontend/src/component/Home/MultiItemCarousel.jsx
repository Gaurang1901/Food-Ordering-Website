import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick';
import { topmeal } from './TopMeal';
import { CarouselItem } from './CarouselItem';
const responsive= [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
      
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 3,
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      
    }
  }
]
export const MultiItemCarousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide:true,
    autoplay:true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    responsive
  };
  return (
    <div>
      <Slider {...settings}>
        {topmeal.map((item)=><CarouselItem image={item.image} title={item.title}/>)}
      </Slider>
     
    </div>
  )
}
