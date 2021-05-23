import React from "react"
import { Container, Col, Row } from "reactstrap"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { map, capitalize } from "lodash"

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

const dwellerData = {
  joe: {
    description: 'Joe likes making sure the house is stocked with snacks'
  },
  jess: {
    description: 'Jess likes fuzzy things'
  },
  graham: {
    description: 'Graham really only cares about snacks'
  },
  justin: {
    description: 'Justin likes gear'
  },
  seneca: {
    description: 'Seneca likes hitting 40mph'
  },
  alon: {
    description: 'Alon likes red white cables'
  },
};


let HomeFeatures = () => {
  const dwellerResponse = useStaticQuery(graphql`fragment defaultImage on File {
      childImageSharp {
          gatsbyImageData(width: 400, height: 250, layout: CONSTRAINED)
      }
  }

  query featuresQuery {
      people:     allFile(filter: { absolutePath: { regex: "/dwellers/" } } sort: { fields: name, order: ASC }) {
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

  const _generateTiles = () => {

    return map(dwellerResponse.people.edges, ({ node }) => {
      const [num, name] = node.name.split('-');
      return (
        <Feature
          title={capitalize(name)}
          description={dwellerData[name].description}
          img={node.childImageSharp.gatsbyImageData}
        />
      )
    })

  }


  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Skibbutz Dwellers</h2>
      <Row>
        {_generateTiles()}
      </Row>
    {/*TODO: Split every 3 into rows*/}
    </Container>
  )
}

export default HomeFeatures
