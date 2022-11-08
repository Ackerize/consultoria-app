import React from "react";

const Checkbox = ({ label, id, value, name, onChange }) => {
  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          className="form-check-input cursor-pointer"
          type="checkbox"
          id={id}
          name={name}
          checked={Boolean(value)}
          onChange={onChange}
        />
        <label className="form-check-label cursor-pointer" htmlFor={id}>
          { label }
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
