import React from 'react';

const DrumPad = (props) =>{
    return(
        <div tabIndex={props.index} className='drum-pad' onKeyUp={e => props.handleKey(e)} onClick={e => props.handleClick(e)} id={props.ident} 
        key={props.children}>
            <audio className='clip' id={props.children} src={props.sounds}></audio>
            {props.children}
        </div>
    )
}

export default DrumPad