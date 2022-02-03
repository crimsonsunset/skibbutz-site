import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import {get} from "lodash"
import styled from "styled-components"

import '@nm/slick-carousel/slick/slick.css';
import '@nm/slick-carousel/slick/slick-theme.css';

import { mediaQueries } from "@styles/theme"

let SlickSlider = () => {
  const imgData = useStaticQuery(graphql`fragment defaultImage on File {
      childImageSharp {
          gatsbyImageData(width: 400, height: 250, layout: CONSTRAINED)
      }
  }

  query headerQuery {
      headerImg:     allFile(filter: { absolutePath: { regex: "/header/" } } sort: { fields: name, order: ASC }) {
          edges{
              node{
                  name
                  childImageSharp {
                      gatsbyImageData(layout: CONSTRAINED)
                  }
              }
          }
      }
  }
  `)

  const header = get(imgData,'headerImg.edges[0].node.childImageSharp.gatsbyImageData.images.fallback.src');

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
    //border: 2px solid red;
    background-size: contain;
    height: auto;
    background-position: 30% 5%;
    //background: navajowhite;
  }
  
  
  ${mediaQueries[1]}{
    //border: 2px solid blue !important;
    background-position: 1% 5%;
  }
  
  ${mediaQueries[2]}{
    //border: 2px solid orange !important;
    background-position: 50% 13%;
  }
  ${mediaQueries[3]}{
    //border: 2px solid purple !important;
    background-position: 50% 13%;
  }
  ${mediaQueries[4]}{
    //border: 2px solid green !important;
    background-position: 50% 13% !important;
  }
  ${mediaQueries[5]}{
    //border: 3px solid black !important;
    background-position: 50% 22%;
  }
`;

  return (
    // <SliderContainer>

        <ImageSlide
        >
          <div className="text-center">
            {/*<h1>{title}</h1>*/}
            {/*<p>By {author}</p>*/}
          </div>
        </ImageSlide>

    // </SliderContainer>
  )
}

export default SlickSlider
