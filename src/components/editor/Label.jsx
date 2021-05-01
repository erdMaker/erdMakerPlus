import React from "react";
import { connect } from "react-redux";
import { updatePositionLabel,updateInitialPositionLabel, resizeLabel, select, repositionComponents } from "../../actions/actions";
import { Group, Rect, Line, Text } from "react-konva";
import { stageWidth, stageHeight, resizeRectSize, fontSize, dragBoundOffset } from "../../global/constants";

class Label extends React.Component {
  componentDidMount(){  if(this.selected===true) {document.getElementById('text').focus()
  
  document.getElementById('text').select()}}
  componentWillUnmount(){ 
    document.getElementsByClassName('react-contextmenu')[0].style.display='block'
    document.getElementsByClassName('stage')[0].focus();
    
  }
  
  state = {
    resizeRect: false,
    isDragging: false,
    initialWidth: this.props.width,
    initialHeight: this.props.height,
  };

  resize = (e) => {
    var widthChange = e.target.getStage().getPointerPosition().x - this.state.initialMousePosition.x;
    var heightChange = e.target.getStage().getPointerPosition().y - this.state.initialMousePosition.y;
    var newWidth = this.state.initialWidth + 2 * widthChange;
    var newHeight = this.state.initialHeight + 2 * heightChange;
    this.props.resizeLabel({
      id: this.props.id,
      width: newWidth,
      height: newHeight,
    });
  };

  // Does not let the label to be dragged out of stage bounds
  stageBound = (pos) => {
    var newX;
    var newY;

    if (pos.x > stageWidth / 2)
      newX =
        pos.x > stageWidth - this.props.width / 2 - dragBoundOffset
          ? stageWidth - this.props.width / 2 - dragBoundOffset
          : pos.x;
    else newX = pos.x < this.props.width / 2 + dragBoundOffset ? this.props.width / 2 + dragBoundOffset : pos.x;

    if (pos.y > stageHeight / 2)
      newY =
        pos.y > stageHeight - this.props.height / 2 - dragBoundOffset
          ? stageHeight - this.props.height / 2 - dragBoundOffset
          : pos.y;
    else newY = pos.y < this.props.height / 2 + dragBoundOffset ? this.props.height / 2 + dragBoundOffset : pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

  render() {
    // Invisible rectangle that is rendered on the mouse pointer when we resize the label
    // It helps to maintain the click and drag event even when the mouse pointer exits the red area
    // Uncomment fill and opacity below to see its effect
    var resizeRect = (
      <Rect
        x={-resizeRectSize / 2 + this.props.x + this.props.width / 2}
        y={-resizeRectSize / 2 + this.props.y + this.props.height / 2}
        width={resizeRectSize}
        height={resizeRectSize}
        visible={this.state.resizeRect}
        
        //fill="yellow"
        //opacity={0.5}
        onTouchMove={(e) => {
          if (this.state.isDragging) this.resize(e);
        }}
        onMouseMove={(e) => {
          if (this.state.isDragging) this.resize(e);
        }}
        onTouchEnd={() => {
          this.setState({
            isDragging: false,
            resizeRect: false,
            initialWidth: this.props.width,
            initialHeight: this.props.height,
          });
        }}
        onMouseUp={() => {
          this.setState({
            isDragging: false,
            resizeRect: false,
            initialWidth: this.props.width,
            initialHeight: this.props.height,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isDragging: false,
            resizeRect: false,
            initialWidth: this.props.width,
            initialHeight: this.props.height,
          });
        }}
      />
    );

    return (
      <Group>
        <Group
          x={this.props.x}
          y={this.props.y}
          draggable
          onDragStart={(e) => {
            this.props.updateInitialPositionLabel({
              id: this.props.id,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onDragMove={(e) => {
            this.props.updatePositionLabel({
              id: this.props.id,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onDragEnd={() => this.props.repositionComponents()}
          onTap={() => {
            this.props.select({
              type: "label",
              id: this.props.id,
              parentId: null,
            });
          }}
         
          
          onClick={() => {
           
            this.props.select({
              type: "label",
              id: this.props.id,
              parentId: null,
            });
            document.getElementById('text').focus()
            document.getElementById('text').select()
          
            document.getElementsByClassName('react-contextmenu')[0].style.display='none'
          }
        }
          
          dragBoundFunc={(pos) => this.stageBound(pos)}
        >
          <Rect
            x={-this.props.width / 2}
            y={-this.props.height / 2}
            width={this.props.width}
            height={this.props.height}
            
            fill="white"
            visible={this.props.selector.current.id === this.props.id ? true : false}
            stroke={
              this.props.id === this.props.selector.current.id && this.props.selector.current.type === "label"
                ? "red"
                : "black"
            }
            strokeWidth={0.5}
          />
          <Text
            text={this.props.text}
            fontSize={fontSize + 3}
            fontFamily={ 'Calibri'}
            fontStyle="bold"
            width={this.props.width}
            height={this.props.height}
            x={-this.props.width / 2}
            y={-this.props.height / 2}
          />
        </Group>
        <Line
          fill="red"
          stroke="red"
          strokeWidth={0.5}
          
          visible={this.props.selector.current.id === this.props.id ? true : false}
          closed
          points={[
            this.props.x + this.props.width / 2,
            this.props.y + this.props.height / 2, // CORNER
            this.props.x + this.props.width / 2,
            this.props.y + this.props.height / 2 - 30, // RIGHT
            this.props.x + this.props.width / 2 - 30,
            this.props.y + this.props.height / 2, // BOTTOM
          ]}
          onTouchStart={(e) => {
            if (!this.state.isDragging)
              this.setState({
                resizeRect: true,
                isDragging: true,
                initialMousePosition: e.target.getStage().getPointerPosition(),
              });
          }}
          onMouseDown={(e) => {
            if (!this.state.isDragging)
              this.setState({
                resizeRect: true,
                isDragging: true,
                initialMousePosition: e.target.getStage().getPointerPosition(),
              });
          }}
        />
        {resizeRect}
      </Group>
    );
  }
}

const mapStateToProps = (state) => ({
  selector: state.selector,
});

const mapDispatchToProps = {
  
  select,
  resizeLabel,
  updatePositionLabel,
  updateInitialPositionLabel,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
