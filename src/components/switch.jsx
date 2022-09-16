import React from "react";

const SwitchButton= (props) =>{
    return(
      <div className="control">
        <p><b>{props.children}</b></p>
        <div className="select">
          <div id={props.ident} className="inner" style={props.estilo} onMouseUp={props.status} />
        </div>
      </div>
    )
}

export default SwitchButton;