import React from 'react';

const InputPassword = (props) => {
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
                type="password"
                placeholder='Wachtwoord'
                value={props.value}
                onChange={props.onChange}
                id="password"
            />
            {props.hasError && (
                <span className="invalid-feedback">{props.error}</span>
            )}
        </div>
    );
};

InputPassword.defaultProps = {
    onChange: () => { }
};

export default InputPassword;