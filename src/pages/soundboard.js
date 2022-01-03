import React, { Component, Fragment } from "react"
import store from "store"
import { bindAll } from "lodash"
import { graphql, StaticQuery } from "gatsby"
import { BsFillPlayCircleFill } from "react-icons/bs"

import PageTemplate from "@components/pageTemplate"
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge, ListGroup, ListGroupItem,
} from "reactstrap"

import DDList from "@components/ddList"


export const SOUNDS_QUERY = graphql`
    query soundsQuery {
        sounds: allFile(
            filter: {sourceInstanceName: {eq: "sounds"}}
            sort: { fields: [name], order:ASC}
        ) {
            edges {
                node {
                    name
                    publicURL
                }
            }
        }
    }

`


class Soundboard extends Component {

  constructor(props) {
    super(props)

    this.soundRefs = {}

    this.state = {
      items: [],
    }

    bindAll(this, [
      "renderSoundChips",
      "_playAudio",
      "_addSound",
    ])

    // this.gMapRef = React.createRef();
    // this.facilityService = FacilityService.getInstance();
    //
    // this.gaService = GAService.getInstance();
    // this.gaService.setScreenName('map');
    //
    // this.mapService = MapService.getInstance();
    // this.mapService.onLocationAccepted = this.onLocationAccepted;
  }


  _playAudio(name) {
    this.soundRefs[name]?.current?.play()
  }


  _addSound(soundNode) {
    // this._playAudio(soundNode.name)

    this.setState({
      items: [
        ...this.state.items,
        soundNode
      ],
    })
  }

  renderSoundChips(soundData) {
    let edges = (!soundData) ? this.edges : soundData.sounds.edges

    // todo: sort from query instead of JS

    return edges.map(({ node }, i) => {
      let currRef = React.createRef()
      this.soundRefs[node.name] = currRef

      return (
        <Fragment
          key={i}
        >

          <audio
            ref={currRef}
          >
            <source src={node.publicURL} type="audio/mpeg" />
          </audio>


          <Button
            outline
            color="primary"
            onClick={(e, i) => {
              this._addSound(node)
            }}
          >
            {node.name}
            <Badge
              color="secondary"
              onClick={(e, i) => {
                this._playAudio(node.name)
              }}
            >
              <BsFillPlayCircleFill />
            </Badge>
          </Button>

        </Fragment>
      )
    })

  }

  render() {

    return (
      <PageTemplate title="Justin Soundboard">


        <Card>
          <CardBody>
            <CardTitle tag="h5">Select Your Words!</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">And then rearrange them to your heart's
              content!</CardSubtitle>
            <CardText>
              <StaticQuery
                query={SOUNDS_QUERY}
                render={this.renderSoundChips}
              />
            </CardText>
            <Button>Play My Sounds!</Button>
          </CardBody>
        </Card>

        <hr className="spacer"></hr>


        <DDList
          items={this.state.items}
        >

        </DDList>

        {/*<ListGroup*/}
        {/*  horizontal*/}
        {/*>*/}
        {/*  <ListGroupItem>*/}
        {/*    Cras justo odio*/}
        {/*  </ListGroupItem>*/}
        {/*  <ListGroupItem>*/}
        {/*    Dapibus ac facilisis in*/}
        {/*  </ListGroupItem>*/}
        {/*  <ListGroupItem>*/}
        {/*    Morbi leo risus*/}
        {/*  </ListGroupItem>*/}
        {/*  <ListGroupItem>*/}
        {/*    Porta ac consectetur ac*/}
        {/*  </ListGroupItem>*/}
        {/*  <ListGroupItem>*/}
        {/*    Vestibulum at eros*/}
        {/*  </ListGroupItem>*/}
        {/*</ListGroup>*/}


      </PageTemplate>
    )
  }
}


export default Soundboard
