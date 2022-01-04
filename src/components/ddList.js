import React, { Component } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { bindAll } from "lodash"
import theme from "@styles/theme"
import { RiDeleteBinFill } from "react-icons/ri"
import { Badge } from "reactstrap"
import styled from "styled-components"

const grid = 8

let StyledDDList = styled.div`
  .drag-list{
    max-width: 300px;
    margin: 0 auto;
    padding-bottom: 1px !important;
  }
  
  span {
    cursor: pointer;
    transform: scale(1.5);
    margin-left: 10px;
    background-color: ${theme.text};
    color: ${theme.secondary};
  }
`


const getItemStyle = (isDragging, draggableStyle) => ({

  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 4,

  // change background colour if dragging
  background: isDragging ? theme.secondary : theme.primary,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? theme.tertiary : "blanchedalmond",
  padding: grid,
  // width: 250,
})

class DDList extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   items: getItems(10),
    // }
    bindAll(this, [
      "onDragEnd",
      "onItemRemoved",
    ])

  }

  onDragEnd(result) {

    // dropped outside the list
    if (!result.destination) {
      return
    }

    this.props.onDragEnd({
      oldState: this.props.items,
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    })

  }

  onItemRemoved(item) {
    this.props.onItemRemoved(item)
  }

  render() {
    return (
      <StyledDDList>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Droppable
            droppableId="droppable"
          >
            {(provided, snapshot) => (
              <div
                className={'drag-list'}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={'drag-item'}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {item.name}

                        <Badge
                          color="secondary"
                          onClick={(e, i) => {
                            this.onItemRemoved({ ...item, index })
                          }}
                        >
                          <RiDeleteBinFill />
                        </Badge>

                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </StyledDDList>
    )
  }
}


export default DDList
