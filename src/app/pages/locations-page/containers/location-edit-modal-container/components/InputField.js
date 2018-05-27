import React from 'react';

const InputField = ({initialValue, label, showError, error, disabled = false, onChange}) => (
  <div className={`${disabled ? "disabledField" : ""}`}>
    <div className="app-modal-style-field-label"><span>-  {label}  -</span></div>
    <input
      type="text"
      placeholder={label.toLocaleLowerCase()}
      defaultValue={initialValue}
      disabled={disabled}
      onChange={evt => onChange(evt.target.value)}
    />
    <span className="app-modal-style-field-error">{showError ? error: ''}</span>
  </div>
)

export default InputField;
