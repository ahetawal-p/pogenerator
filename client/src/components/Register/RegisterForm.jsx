/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  required,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label htmlFor={label}>{required ? `* ${label}` : `${label}`}</label>
    <input
      {...input}
      className={`form-control${touched && error ? ' is-invalid' : ''}`}
      placeholder={label}
      type={type}
    />
    {touched &&
      (error && (
        <div className="col-sm-0">
          <small className="text-danger">{error}</small>
        </div>
      ))}
  </div>
);

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
        required
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
        required
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        required
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        required
      />
      <div className="form-row">
        <div className="form-group col-md-3">
          <button
            className="btn btn-outline-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
        <div className="form-group col-sm-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
        <div className="form-group col-sm-3">
          <Link to="/login" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'register', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(RegisterForm);
