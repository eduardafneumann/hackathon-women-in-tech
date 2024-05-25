import "./ocorridos.css";

import React from "react";

function Input({ type, name, value, handleChange }) {
  return (
    <input type={type} name={name} value={value} onChange={handleChange} />
  );
}

export default Input;
