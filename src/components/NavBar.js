import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RouteNavBar from './RouteNavBar';


class NavBar extends Component {

  static muiName = 'FlatButton';

  render() {
    return (
    <AppBar
      title="ideaGen"
      iconElementRight={this.props.childProps.userToken
        ?  (<div>
            <RouteNavBar
              {...this.props}
              onClick={this.props.onLogout}
              label="Logout"
            />
        </div>)
        : (<div>
          <RouteNavBar
            {...this.props}
            onClick={this.props.onClick}
            label="Create Account"
            href="/create-account"
          />
          <RouteNavBar
            {...this.props}
            onClick={this.props.onClick}
            label="Login"
            href="/login"
            />
        </div>)
      }
    />
  );
  }
}

export default NavBar;
