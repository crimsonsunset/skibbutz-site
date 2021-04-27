import React from "react"
import { Container, Col, Row } from "reactstrap"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

let StyledFeature = styled.div`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transition-duration: 0.25s;

  &:hover {
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.20);
  }
`

let Feature = ({ title, description, img }) => (
  <Col md={4} className="mb-3">
    <StyledFeature>
      <GatsbyImage image={img} />
      <div className="p-3">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </StyledFeature>
  </Col>
)

let HomeFeatures = () => {
  const data = useStaticQuery(graphql`fragment defaultImage on File {
      childImageSharp {
          gatsbyImageData(width: 400, height: 250, layout: CONSTRAINED)
      }
  }

  query featuresQuery {
      
    slide1: file(relativePath: { eq: "slide1.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    slide2: file(relativePath: { eq: "slide2.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    slide3: file(relativePath: { eq: "slide3.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    alon: file(relativePath: { eq: "alon.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    graham: file(relativePath: { eq: "graham.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    jess: file(relativePath: { eq: "jess.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    joe: file(relativePath: { eq: "joe.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    justin: file(relativePath: { eq: "justin.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
    seneca: file(relativePath: { eq: "seneca.jpg" }) {
        childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
        }
    }
  }
  `)
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Skibbutz Dwellers</h2>
      <Row>
        <Feature
          title="Joe"
          description="Joe likes making sure the house is stocked with snacks"
          img={data.joe.childImageSharp.gatsbyImageData}
        />
        <Feature
          title="Jess"
          description="Jess likes fuzzy things"
          img={data.jess.childImageSharp.gatsbyImageData}
        />
        <Feature
          title="Graham"
          description="Graham really only cares about snacks"
          img={data.graham.childImageSharp.gatsbyImageData}
        />
      </Row>
      <Row>
        <Feature
          title="Justin"
          description="Justin likes gear"
          img={data.justin.childImageSharp.gatsbyImageData}
        />
        <Feature
          title="Seneca"
          description="Seneca likes hitting 40mph"
          img={data.seneca.childImageSharp.gatsbyImageData}
        />
        <Feature
          title="Alon"
          description="Alon likes red white cables"
          img={data.alon.childImageSharp.gatsbyImageData}
        />
      </Row>
    </Container>
  )
}

export default HomeFeatures
