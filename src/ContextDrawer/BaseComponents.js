import React from "react";
import "./BaseComponents.css";

const Button = props => <button onClick={props.onClick}>{props.text}</button>;

const Select = props => {
  const { category, options, defaultOption, handleChange, className } = props;
  const composedClassName = ("baseSelect " + className).trim();

  return (
    <div className={composedClassName}>
      <span>{category}: </span>
      <select onChange={handleChange} defaultValue={defaultOption}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  className: ""
};

export { Button, Select };
