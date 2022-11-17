import React from 'react';

const InputDisabled = (props) => {
    let inputClassName = props.classes;
    if (props.type === 'file') {
        props.className += '-file';
    }
    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
    };


    return (
        <div>
            {props.label && <label className={props.labelClass}>{props.label}</label>}
            <input
                name={props.name}
                className={inputClassName}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                value={props.value}
                disabled
            />
            {props.hasError && (
                <span className="invalid-feedback">{props.error}</span>
            )}
        </div>
    );
};

export default InputDisabled;