/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const validate = values => {
  const errors = {};
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
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

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <div className="form-group">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Submit
        </button>
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(LoginForm);
