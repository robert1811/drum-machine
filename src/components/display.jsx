import React from "react";

const Display = (props) =>{
    return(
        <p id="display"><b>{props.children}</b></p>
    )
}

export default Display;