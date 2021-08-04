import React from "react";
import { connect } from "react-redux";
import {
  modifyExtension,
  deleteExtension,
  deselect,
  addXConnection,
  changeXConnection,
  deleteXConnection,
} from "../../actions/actions";



import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {stageHeight,dragBoundOffset} from '../../global/constants'


class ExtensionProperties extends React.Component {

 
  findExtensionIndex = (extension) => extension.id === this.props.selector.current.id;

componentDidMount() {
  

 if(this.props.components.notation!=='Batini, Ceri & Navathe Notation') document.getElementById('type').focus(); 
  document.getElementsByClassName('sidepanel')[0].style.display='block';
  
  //na anoigei mes sta oria tou parathyroy
  var extensionIndex = this.props.components.extensions.findIndex(this.findExtensionIndex);
 if (this.props.components.extensions[extensionIndex].y!==22){
   
  //document.getElementsByClassName('sidepanel')[0].style.top= '250px';
  document.getElementsByClassName('sidepanel')[0].style.top=stageHeight/6  +'px'}

  else {
    document.getElementsByClassName('sidepanel')[0].style.top= dragBoundOffset + 'px'
  }
 

}

 

  findParentIndex = (entity) => entity.id === this.props.selector.current.parentId;

  handleModifyExtension = (e) => {
    this.props.modifyExtension({
      id: this.props.selector.current.id,
      prop: e.target.id,
      value: e.target.value,
    });
  };
  
    
 componentWillUnmount(){ 
  document.getElementsByClassName('stage')[0].focus();
  document.getElementsByClassName('react-contextmenu')[0].style.display='block'
}
  

  handleFocus = (e) => e.target.select();
  render() {
    var extensionIndex = this.props.components.extensions.findIndex(this.findExtensionIndex);
    var parentIndex = this.props.components.entities.findIndex(this.findParentIndex);
    var content;
    if (this.props.components.extensions[extensionIndex].type === "specialize")
      content = (
        <Specialize
          extension={this.props.components.extensions[extensionIndex]}
          parent={this.props.components.entities[parentIndex]}
          handleModifyExtension={this.handleModifyExtension}
        />
      );
    else if (this.props.components.extensions[extensionIndex].type === "union")
      content = (
        <Union
          extension={this.props.components.extensions[extensionIndex]}
          parent={this.props.components.entities[parentIndex]}
          handleModifyExtension={this.handleModifyExtension}
        />
      );
      else if (this.props.components.extensions[extensionIndex].type === "aggregation")
      content = (
        <Aggregation
          extension={this.props.components.extensions[extensionIndex]}
          parent={this.props.components.entities[parentIndex]}
          handleModifyExtension={this.handleModifyExtension}
        />
      );
    else content = null;

    const addEntityButton =
    this.props.components.notation==='Batini, Ceri & Navathe Notation' || (
      this.props.components.extensions[extensionIndex].type !== "undefined" &&
      this.props.components.extensions[extensionIndex].xconnections.length < 30) ? (
        <button
        className='buttonmenu' style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}} 
         
          type="button"
          onClick={() => {
            this.props.addXConnection({ id: this.props.selector.current.id });
          }}
        >
          Add Entity
        </button>
      ) : null;


    if(this.props.components.notation!=='Batini, Ceri & Navathe Notation')
    return (
      <div className="sidepanel-content">
        {/*<h3>Extension</h3>*/}
        <div /*className="extension-group"*/ style={{marginBottom: 5, padding: '6px 0px 0px 6px'}}>
          Type:
          <select
            id="type"
            value={this.props.components.extensions[extensionIndex].type}
            onChange={this.handleModifyExtension}
            onKeyDown={ (event) => {if (event.key==='Delete') {
             this.props.deleteExtension({ id: this.props.selector.current.id, parentId: this.props.selector.current.parentId });
              this.props.deselect();
              document.getElementsByClassName('stage')[0].focus();
              
             
            }
          else if(event.key==='Escape' || event.key==='Enter'){
          this.props.deselect();
          document.getElementsByClassName('stage')[0].focus();}} }
          >
            <option value="undefined" disabled>
              Select Type
            </option>
            <option value="specialize">Specialize</option>
            <option style={{display:this.props.components.notation==='Teorey Notation'?'none':'block'}} value="union">Union</option>
            <option style={{display:this.props.components.notation!=='Teorey Notation'?'none':'block'}} value='aggregation'>Aggregation</option>
            
          </select>
        </div>
        {content}
        <div className="connections-list" style={{backgroundColor: '#dfdfdf'}}>
          <XConnections  extension={this.props.components.extensions[extensionIndex]} />
        </div>
        <div className="buttons-list">
          {addEntityButton}
          <button
          className='buttonmenu'
           /* className="properties-delete-button"*/
           style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
            type="button"
            onClick={() => {
              this.props.deleteExtension({ id: this.props.selector.current.id, parentId: this.props.selector.current.parentId });
              this.props.deselect();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    )
    else return( <div className="sidepanel-content">
    {/*<h3>Extension</h3>*/}
    
    
    <div className="connections-list" style={{backgroundColor: '#dfdfdf'}}>
      <XConnections  extension={this.props.components.extensions[extensionIndex]} />
    </div>
    <div className="buttons-list">
      {addEntityButton}
      <button
      className='buttonmenu'
       /* className="properties-delete-button"*/
       style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
        type="button"
        onClick={() => {
          this.props.deleteExtension({ id: this.props.selector.current.id });
          this.props.deselect();
        }}
      >
        Delete
      </button>
    </div>
  </div>)
  }
}

const Specialize = (props) => {
  return (
    <>
      <div /*className="extension-group"*/ style={{marginBottom: 5, padding: '6px 0px 0px 6px'}}>
        Participation:
        <select id="participation" value={props.extension.participation} onChange={props.handleModifyExtension}>
          <option value="partial">Partial</option>
          <option value="total">Total</option>
        </select>
      </div>
      <div /*className="extension-group"*/ style={{marginBottom: 5, padding: '6px 0px 0px 6px'}}>
        Cardinality:
        <select id="cardinality" value={props.extension.cardinality} onChange={props.handleModifyExtension}>
          <option value="disjoint">Disjoint</option>
          <option value="overlap">Overlap</option>
        </select>
      </div>
      <hr />
      <div style={{fontWeight: 'bold', marginBottom: 5}} /*className="extension-group" */>{props.parent.name} specializes at:</div>
    </>
  );
};

const Union = (props) => {
  return (
    <>
      <div className="extension-group" style={{marginBottom: 5, padding: '6px 0px 0px 6px'}}>
        Participation:
        <select id="participation" value={props.extension.participation} onChange={props.handleModifyExtension}>
          <option value="partial">Partial</option>
          <option value="total">Total</option>
        </select>
      </div>
      <hr />
      <div className="extension-group" style={{fontWeight:'bold'}}>{props.parent.name} is a Union of:</div>
    </>
  );
};

const Aggregation = (props) => {
  return (
    <>
     
      <div className="extension-group" style={{fontWeight:'bold'}}>{props.parent.name} is an Aggregation of:</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  modifyExtension,
  deleteExtension,
  deselect,
  addXConnection,
  changeXConnection,
  deleteXConnection,
};

// Component for all extension connections
const XConnections = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  let xconnectionList = [];
  const handleChangeXConnection = (xconnectionId, e) =>
    props.changeXConnection({
      id: props.extension.id,
      xconnectionIndex: xconnectionId,
      connectId: Number(e.target.value),
    });

  for (let i in props.extension.xconnections) {
    xconnectionList.push(
      <span key={i} style={{ margin: "auto", marginBottom: "10px" }}>
        <select
          value={props.extension.xconnections[i].connectId}
          onChange={(e) => handleChangeXConnection(props.extension.xconnections[i].id, e)}
        >
          <option value={0} disabled>
            Select Entity
          </option>
          <XEntityList extension={props.extension} />
        </select>
        <IconButton
        
          onClick={() => {
            props.deleteXConnection({
              extensionId: props.extension.id,
              xconnectionId: props.extension.xconnections[i].id,
            });
            
          }}
        >
          <DeleteIcon />
        </IconButton>
      </span>
    );
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>{xconnectionList}</div>;
});

const XEntityList = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  var entityList = [];
  var found;
  for (let i in props.components.entities) {
    found = false;
    if (props.components.entities[i].id === props.extension.parentId) continue;
    for (let j in props.extension.xconnections) {
      if (props.components.entities[i].id === props.extension.xconnections[j].connectId) {
        found = true;
        break;
      }
    }
    entityList.push(
      <option key={props.components.entities[i].id} value={props.components.entities[i].id} disabled={found}>
        {props.components.entities[i].name}
      </option>
    );
  }
  return entityList;
});

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionProperties);
