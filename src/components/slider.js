import React from "react";
import Slider from "react-slick";
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import '@nm/slick-carousel/slick/slick.css';
import '@nm/slick-carousel/slick/slick-theme.css';

import header from '@img/header.jpg'
import { mediaQueries } from "@styles/theme"

// const SliderContainer = styled.div`
//   background: linear-gradient(210deg, #943cff 0%, #dd45d3 40.13%, #fc9a57 90%);
//   color: white;
//   padding: 10rem 0;
//   clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
// `;

const ImageSlide = styled.div`
  //background: url(${header});
  background: url(${header}) no-repeat center center;
  background-size: cover;
  background-position: 50% 5%;
  height: 60vh;
  padding: 10rem 0;
  color: white;
  //border: 1px solid blue;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  //padding: 10rem 0;
  //clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);

  ${mediaQueries[0]}{
    //border: 11px solid red;
    background-size: contain;
    height: auto;
    background-position: 30% 5%;
    //background: navajowhite;
  }
  
  
  ${mediaQueries[1]}{
    background-position: 1% 5%;
  }
  
  ${mediaQueries[4]}{
    //border: 11px solid red;
    background-position: 50% 7%;
  }
  
`;



let SlickSlider = () => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const sideMetadata = useStaticQuery(graphql`
    query TitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  // let {title, author} = sideMetadata.site.siteMetadata
  let {title} = sideMetadata.site.siteMetadata
  return (
    // <SliderContainer>
      <Slider {...settings}>
        <ImageSlide
        >
          <div className="text-center">
            {/*<h1>{title}</h1>*/}
            {/*<p>By {author}</p>*/}
          </div>
        </ImageSlide>
        <div>
          <div className="text-center">
            <h1>{title}</h1>
            {/*<p>By {author}</p>*/}
          </div>
        </div>
        <div>
          <div className="text-center">
            <h1>{title}</h1>
            {/*<p>By {author}</p>*/}
          </div>
        </div>
      </Slider>
    // </SliderContainer>
  )
}

export default SlickSlider
