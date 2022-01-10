import React, { Component, Fragment } from "react"
import store from "store"
import { bindAll, cloneDeep, remove, uniqueId, map, flattenDeep } from "lodash"
import { graphql, StaticQuery } from "gatsby"
import { BsFillPlayCircleFill } from "react-icons/bs"
import styled from "styled-components"
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge, Input,
  Form, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu,
} from "reactstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { Howl } from "howler"
import Slider from "react-rangeslider"

import theme from "@styles/theme"
import PageTemplate from "@components/pageTemplate"
import DDList from "@components/ddList"
import Hr from "@components/hr"


let SBCard = styled.div`
  h6 {
    margin-bottom: 25px !important;
  }

  .rbt {
    margin-bottom: 5px !important;
  }

  hr {
    width: auto !important;
  }

  .dropdown-menu.show{
    min-width: 92px;
  }
  
  .form-check {
    display: flex;
    flex-direction: column;
  }

  .form-check-label{
    margin-bottom: 10px !important;
  }

  .dropdown-toggle {
   margin-top: 30px; 
  }

`

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

  .fg-row {
    display: flex;
    justify-content: space-between;
    gap: 40px;
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
    this.soundsFromQuery = []
    this.BLANK_SOUND_URL = undefined
    this.typeaheadRef = undefined

    this.state = {
      items: [],
      delay: 0.25,
      loop: false,
      volume: 1.0,
      rate: 1.0,
      isVolumeToggleOpen: false,
    }

    bindAll(this, [
      "renderSoundChips",
      "_playAudio",
      "_autoplay",
      "_playSentence",
      "_addSound",
      "_onItemsChanged",
      "_onItemsRemoved",
      "_onWordSelected",
    ])
  }

  componentDidMount() {
    // todo: cleanup and remove this
    // to render items in typeahead (gatsby query)
    this.forceUpdate()
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

  _onWordSelected([item, ...rest]) {

    if (!item) {
      return
    }

    this.setState({
      items: [
        ...this.state.items,
        item,
      ],
    })
    this.typeaheadRef.current.clear()
    this.typeaheadRef.current.focus()

  }


  _autoplay(i, list) {
    const currSound = list[i]
    const { loop, speed, volume, rate } = this.state
    let playOptions = {
      src: [currSound],
      preload: true,
      loop,
      speed,
      volume,
      rate,
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


    const retChips = edges.map(({ node }, i) => {

      // dont want blank button
      if (node.name === "BLANK_SOUND") {
        this.BLANK_SOUND_URL = node.publicURL
        return (
          <Fragment key={i} />
        )
      }
      this.soundLocations[node.name] = node.publicURL

      const name = node.name.replace("_", `'`)

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
            {name}
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

    this.soundsFromQuery = edges.map(({ node }) => {
      // dont want blank option
      if (node.name === "BLANK_SOUND") {
        this.BLANK_SOUND_URL = node.publicURL
        return undefined
      } else {
        return { ...node, label: node.name }
      }
    }).filter(Boolean)
    return retChips

  }

  render() {
    const areButtonsDisabled = this.state.items.length === 0
    this.typeaheadRef = React.createRef()
    return (
      <PageTemplate title="Justin Soundboard">

        <SBCard>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Select Your Words!</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">And then rearrange them to your heart's
                content!</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Typeahead
                  ref={this.typeaheadRef}
                  clearButton
                  id="wordSearch"
                  placeholder="Search for a Word..."
                  onChange={this._onWordSelected}
                  options={this.soundsFromQuery}
                />
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

                  <div className="fg-row">

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

                    <FormGroup>
                      <Label for="rate">
                        Speed
                      </Label>
                      <Input
                        id="rate"
                        name="rate"
                        placeholder="1.0"
                        step="0.25"
                        min="0"
                        max="4.0"
                        type="number"
                        onChange={(evt) => {
                          this.setState({ rate: evt.currentTarget.value })
                        }}
                      />
                    </FormGroup>

                    <FormGroup
                      check
                      inline
                    >

                      <Label
                        for="rate"
                        check>
                        Loop?
                      </Label>

                      <Input
                        id="loop"
                        type="checkbox"
                        onClick={(evt) => {
                          this.setState({ loop: !this.state.loop })
                        }}
                      />

                    </FormGroup>

                    <FormGroup
                    >
                      <div>
                        <Dropdown
                          direction="up"
                          isOpen={this.state.isVolumeToggleOpen}
                          toggle={(evt) => {
                            this.setState({ isVolumeToggleOpen: !this.state.isVolumeToggleOpen })
                          }}
                        >
                          <DropdownToggle caret>
                            Volume
                          </DropdownToggle>
                          <DropdownMenu>

                            <div className="slider-vertical">
                              <Slider
                                min={0}
                                max={1}
                                step={0.1}
                                tooltip={false}
                                value={this.state.volume}
                                orientation="vertical"
                                onChange={(value) => {
                                  this.setState({ volume: value })
                                }}
                              />
                            </div>

                          </DropdownMenu>
                        </Dropdown>
                      </div>

                    </FormGroup>

                  </div>

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
        </SBCard>


      </PageTemplate>
    )
  }
}


export default Soundboard
