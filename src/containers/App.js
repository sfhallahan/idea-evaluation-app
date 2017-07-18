import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';
import Routes from '../Routes';


class App extends Component {

  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <NavBar onClick={this.handleNavLink} />
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
