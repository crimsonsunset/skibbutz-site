import React, { useState } from "react"
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Alert } from "reactstrap"
import Link from "@components/link"
import Layout from "@components/layout"
import Seo from "@components/seo"
import { FaSkiing } from "react-icons/fa"
import { GiHouse } from "react-icons/gi"
// import {  GiHouse, GiPartyPopper } from 'react-icons/gi'
import { MdComputer } from "react-icons/md"
import Slider from "@components/slider"
import Box from "@components/box"
import styled from "styled-components"
import HomeFeatures from "@components/homeFeatures"

// import Button from '@components//btn'
// import Hr from '@components//hr'
// import Benefits from '@components//benefits'
// import Form from '@components//form'

let StyledBackground = styled.div`
  background: linear-gradient(to bottom, #f9fbfd 0, #fff 100%);
`

let Service = ({ title, Icon }) => (
  <Col xs={12} md={4} className="mb-3">
    <Link to="/">
      <Box>
        <Icon size={30} />
        <h4 className="mt-3">{title}</h4>
      </Box>
    </Link>
  </Col>
)


let Index = () => {
  const [isAlertOpen, setAlertOpen] = useState(true);

  return (
    <Layout>
      <Seo title="Home" />

      <Alert
        className={"alert-home"}
        color="primary"
        style={{ textAlign: "center" }}
        isOpen={isAlertOpen}
        toggle={()=>{
          setAlertOpen(!isAlertOpen)
        }}
      >

        <div className="flip-vertical">🚙</div>
        Hey you: We're on Tour! Come visit us at a {" "}
        <Link
          to="/tour"
        >
          &nbsp;city near you
        </Link>
        . 🚙

      </Alert>

      <Slider />
      <Container className="pt-4">
        <div className="text-center">
          <h4>Welcome to the Skibbutz! Our lovely home away from home for the 2021 Ski Season!
            <span role="img" aria-label="Ski">🎿</span>
          </h4>
          <p className="text-muted">Built with love from Keystone, CO
            <span role="img" aria-label="Mountain"> 🗻</span>
          </p>
        </div>
      </Container>
      <Container className="py-5">
        <h2 className="text-center mb-4">Principles</h2>
        <Row>
          <Service title="Live" Icon={GiHouse} />
          <Service title="Work" Icon={MdComputer} />
          <Service title="Ski" Icon={FaSkiing} />
          {/*<Service title="Party" Icon={GiPartyPopper}/>*/}
        </Row>
      </Container>
      {/*<div className="text-center py-5">*/}
      {/*  <Button to="https://github.com/jeremylynch/gatsby-strapi-starter" className="btn btn-primary btn-lg">*/}
      {/*    <FaGithub className="mr-1"/>*/}
      {/*    View on Github*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <StyledBackground>
        {/*<Benefits/>*/}

        {/*<div className="py-5">*/}
        {/*  <Container>*/}
        {/*    <Row className="d-flex justify-content-center">*/}
        {/*      <Col md={8}>*/}
        {/*        <Box style={{textAlign: 'left'}}>*/}
        {/*          <h3 className="text-center">Reactstrap Form Fields</h3>*/}
        {/*          <Hr/>*/}
        {/*          <Form/>*/}
        {/*        </Box>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </Container>*/}
        {/*</div>*/}


      </StyledBackground>
      <HomeFeatures />
    </Layout>
  )
}
export default Index
