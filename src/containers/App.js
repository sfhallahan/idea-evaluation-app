import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';
import Routes from '../Routes';
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import config from '../config.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoadingUserToken: true,
    };
  }

  async componentDidMount() {
    const currentUser = this.getCurrentUser();

    if(currentUser === null) {
      this.setState({isLoadingUserToken: false});
      return;
    }

    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    } catch(e) {
      alert(e);
    }

    this.setState({isLoadingUserToken: false});
  }

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function(err, session){
        if(err) {
          reject(err);
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken,
    });
  }


  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  handleLogout = (event) => {
    const currentUser = this.getCurrentUser();

    if(currentUser !== null) {
      currentUser.signOut();
    }
    this.updateUserToken(null);
    this.props.history.push("/login");
  }

  render() {

    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

    return !this.state.isLoadingUserToken
    &&
    (
      <MuiThemeProvider>
        <div className="App">
          <NavBar onClick={this.handleNavLink} onLogout={this.handleLogout} childProps={childProps} />
          <Routes childProps={childProps} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
