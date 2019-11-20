/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import POGridView from './views/POGridView';
import { RegisterView } from './components/Register';
import { LoginView } from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import * as alertActions from './actions/AlertAction';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron" style={{ marginBottom: 0 }}>
        <div>
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={POGridView} />
              <Route path="/register" component={RegisterView} />
              <Route path="/login" component={LoginView} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
