import React from 'react'
import {Container} from 'reactstrap'

let SubFooter = ({title}) => (

  <div className="bg-light">
    <Container
      style={{ margin: "0 auto", textAlign:"right", marginRight: "0px"}}
      className="pb-3">
      <span className="text-secondary small">Copyright Skibbutz © {new Date().getFullYear()}. All rights reserved.</span>
    </Container>
  </div>
)

export default SubFooter
