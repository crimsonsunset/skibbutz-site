import React, { Component, Fragment } from "react"
import store from "store"
import { bindAll, cloneDeep, remove, uniqueId, map, flattenDeep } from "lodash"
import { graphql, StaticQuery } from "gatsby"
import { BsFillPlayCircleFill } from "react-icons/bs"
import styled from "styled-components"
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge, Input, Form, FormGroup, Label,
} from "reactstrap"
import { Howl } from "howler"

import theme from "@styles/theme"
import PageTemplate from "@components/pageTemplate"
import DDList from "@components/ddList"
import Hr from "@components/hr"


let WordBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  button {
    background-color: blanchedalmond;
    text-align: center;
    padding: 10px;
  }

  span {
    transform: scale(1.5);
    margin-left: 5px;
    background-color: transparent;
    color: ${theme.tertiary};
  }
`

let ActionBox = styled.div`
  display: flex;
  justify-content: center;

  input {
    max-width: 100px;
    margin: 0 auto;
  }

  .submit-fg {
    display: flex;
    justify-content: center;
  }

  .form-group {
    text-align: center;
  }

  .clear-btn {
    background-color: ${theme.text};
    margin-left: 15px;
  }

`


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

    this.soundLocations = {}
    this.BLANK_SOUND_URL = undefined

    this.state = {
      items: [],
      delay: 0.25,
    }

    bindAll(this, [
      "renderSoundChips",
      "_playAudio",
      "_autoplay",
      "_playSentence",
      "_addSound",
      "_onItemsChanged",
      "_onItemsRemoved",
    ])

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


  _autoplay(i, list) {
    const currSound = list[i]
    let playOptions = {
      src: [currSound],
      preload: true,
    }
    let spriteName
    const that = this
    const isBlankSound = currSound.includes("BLANK_SOUND")

    if (isBlankSound) {
      spriteName = "blank"
      playOptions = {
        ...playOptions,
        sprite: {
          [spriteName]: [0, this.state.delay * 1000],
        },
      }
    }

    const sound = new Howl({
      ...playOptions,
      onend() {
        if ((i + 1) !== list.length) {
          that._autoplay(i + 1, list)
        }
      },
    })

    sound.play(spriteName)

  }

  _playSentence() {

    // pull out URLs, insert blank sound in between
    const soundList = flattenDeep(map(this.state.items, (sound) => {
      return [sound.publicURL, this.BLANK_SOUND_URL]
    }))

    this._autoplay(0, soundList)

  }

  _playAudio(name) {
    this._autoplay(0, [this.soundLocations[name]])
  }


  _addSound(soundNode) {

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

      // dont want blank button
      if (node.name === "BLANK_SOUND") {
        this.BLANK_SOUND_URL = node.publicURL
        return (
          <Fragment key={i} />
        )
      }
      this.soundLocations[node.name] = node.publicURL

      return (
        <Fragment
          key={i}
        >
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
              onClick={(evt) => {
                evt.stopPropagation()
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
    const areButtonsDisabled = this.state.items.length === 0;
    return (
      <PageTemplate title="Justin Soundboard">


        <Card>
          <CardBody>
            <CardTitle tag="h5">Select Your Words!</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">And then rearrange them to your heart's
              content!</CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">


            </CardSubtitle>
            <CardText>

              <WordBox>
                <StaticQuery
                  query={SOUNDS_QUERY}
                  render={this.renderSoundChips}
                />
              </WordBox>

              <Hr />

              <CardTitle tag="h4" className="mb-2 text-muted"> Justin Says... </CardTitle>

              <DDList
                items={this.state.items}
                onDragEnd={this._onItemsChanged}
                onItemRemoved={this._onItemsRemoved}
              >

              </DDList>

            </CardText>

            <ActionBox>

              <Form>
                <FormGroup>
                  <Label for="wordDelay">
                    Delay Between Words (sec)
                  </Label>
                  <Input
                    id="wordDelay"
                    name="word delay"
                    placeholder="0.25"
                    step="0.25"
                    min="0"
                    max="4.0"
                    type="number"
                    onChange={(evt) => {
                      this.setState({ delay: evt.currentTarget.value })
                    }}
                  />
                </FormGroup>

                <FormGroup
                  className="submit-fg"
                >
                  <Button
                    disabled={areButtonsDisabled}
                    color="primary"
                    onClick={(evt) => {
                      evt.preventDefault()
                      this._playSentence()
                    }}
                  >
                    What's that, Justin?
                  </Button>

                  <Button
                    disabled={areButtonsDisabled}
                    className="clear-btn"
                    onClick={(evt) => {
                      evt.preventDefault()
                      this.setState({ items: [] })
                    }}
                  >
                    Clear Words
                  </Button>

                </FormGroup>

              </Form>
            </ActionBox>


          </CardBody>
        </Card>


      </PageTemplate>
    )
  }
}


export default Soundboard
