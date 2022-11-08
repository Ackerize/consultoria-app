import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  defaultValue = "",
  mode = "input",
  placeholder = "",
}) => {
  return (
    <div className="col mb-0">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {mode === "input" ? (
        <input
          type={type}
          id={name}
          className="form-control"
          name={name}
          {...(disabled
            ? {
                disabled,
                defaultValue,
              }
            : { value, onChange })}
        />
      ) : (
        <textarea
          type={type}
          id={name}
          className="form-control"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
        />
      )}
    </div>
  );
};

export default FormInput;
