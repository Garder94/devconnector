import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeHolder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeHolder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  erro: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default TextAreaFieldGroup;
