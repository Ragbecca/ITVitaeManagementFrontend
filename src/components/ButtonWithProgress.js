import React from "react";

const ButtonWithProgress = (props) => {
    return (
        <button className={props.classes} onClick={props.onClick}
            disabled={props.disabled}>
            {props.pendingApiCall && (<div className='spinner-border text-light spinner-border-sm me-sm-1'>
                <span className='visually-hidden'>Loading...</span>
            </div>)}
            {props.text}
        </button>
    )
}

export default ButtonWithProgress;