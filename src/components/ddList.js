import React, { Component } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { bindAll } from "lodash"

import theme from "@styles/theme"
import { RiDeleteBinLine } from "react-icons/ri";
import { Badge } from "reactstrap"

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({

  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? theme.secondary : theme.primary,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? theme.tertiary : "lightgrey",
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
    });

  }

  onItemRemoved(item) {
    this.props.onItemRemoved(item);
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="droppable"
        >
          {(provided, snapshot) => (
            <div
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
                          this.onItemRemoved({ ...item,index })
                        }}
                      >
                        <RiDeleteBinLine />
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
    )
  }
}


export default DDList
