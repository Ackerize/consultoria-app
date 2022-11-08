import React from "react";
import "./styles.css";

const RadioButton = ({ name, label, value, onChange }) => {
  return (
    <div className="option-container">
      <input
        type="radio"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        checked={value}
      />

      <label htmlFor={name} className={`box ${name}`}>
        <div className="plan">
          <span className="circle"></span>
          <span className="yearly">{label}</span>
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
