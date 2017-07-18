import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class RouteNavBar extends Component {
  render() {
    return (
      <Route path={this.props.href} exact children={({ match }) => (
        <FlatButton {...this.props} active={ match ? true : false }>{ this.props.children }
        </FlatButton>
      )}/>
    );
  }
}

export default RouteNavBar;
