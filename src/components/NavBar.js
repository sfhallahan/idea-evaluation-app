import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RouteNavBar from './RouteNavBar';


class NavBar extends Component {

  static muiName = 'FlatButton';

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
    <AppBar
      title="ideaGen"
      iconElementRight={
        <div>
          <RouteNavBar
            {...this.props}
            onClick={this.handleClick}
            label="Create Account"
            href="/create-account"
          />
          <RouteNavBar
            {...this.props}
            onClick={this.handleClick}
            label="Login"
            href="/login"
            />
        </div>
      }
    />
  );
  }
}

export default NavBar;
