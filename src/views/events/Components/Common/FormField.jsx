import React from "react";
import { Field } from "formik";
import { FormGroup, Label, FormFeedback } from "reactstrap";
import PropTypes from "prop-types";

const FormField = (props) => {
  const {
    touched,
    errors,
    label,
    type,
    name,
    value,
    component,
    showLabel:showlabel,
    placeholder,
    options,
    multiple,
    fieldClasses,
  } = props;
  return (
    <FormGroup className="event-form-group">
      { showlabel && <Label for={name}>{label}</Label>}

      {type === "select" ? (
        <Field
          as="select"
          name={name}
          multiple={ multiple ? true : false }
          className={`form-control ${fieldClasses} ${errors[name] &&
            touched[name] &&
            "is-invalid"}`}
          {...props}
        >
          <option value="">Choose {name}</option>
          {(options || []).map((option, index) => {
            const { label, value } = option;
            return (
              <option value={value} key={index}>
                {label}
              </option>
            );
          })}
        </Field>
      ) : (
        <Field
          component={component || "input"}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`form-control ${fieldClasses} ${errors[name] &&
            touched[name] &&
            "is-invalid"}`}
          {...props}
        />
      )}

      {errors[name] && touched[name] && (
        <FormFeedback>{errors[name]}</FormFeedback>
      )}
    </FormGroup>
  );
};

FormField.propTypes = {
  touched: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.string,
  showLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  fieldClasses: PropTypes.string,
  options: PropTypes.any,
};

export default FormField;
