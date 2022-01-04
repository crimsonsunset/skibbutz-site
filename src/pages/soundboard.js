import React, { Component, Fragment } from "react"
import store from "store"
import { bindAll, cloneDeep, remove, uniqueId } from "lodash"
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


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}


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
      "_onItemsChanged",
      "_onItemsRemoved",
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


  _onItemsRemoved(item) {

    let items = cloneDeep(this.state.items)
    remove(items, (e) => {
      return e.id === item.id
    })

    this.setState({
      items,
    })
  }

  _onItemsChanged({ oldState, sourceIndex, destinationIndex }) {

    const items = reorder(oldState, sourceIndex, destinationIndex)

    this.setState({
      items,
    })
  }


  _playAudio(name) {
    this.soundRefs[name]?.current?.play()
  }


  _addSound(soundNode) {
    // this._playAudio(soundNode.name)

    this.setState({
      items: [
        ...this.state.items,
        {
          id: uniqueId(),
          ...soundNode,
        },
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

              <hr className="spacer"></hr>

              <CardTitle tag="h4" className="mb-2 text-muted"> Justin Says... </CardTitle>

              <DDList
                items={this.state.items}
                onDragEnd={this._onItemsChanged}
                onItemRemoved={this._onItemsRemoved}
              >

              </DDList>

            </CardText>
            <Button
              color="primary"
            >What's that, Justin?</Button>
          </CardBody>
        </Card>


      </PageTemplate>
    )
  }
}


export default Soundboard
