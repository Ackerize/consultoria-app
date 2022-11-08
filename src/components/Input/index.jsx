import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({ label, type = "text", placeholder, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group input-group-merge">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className="form-control"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
