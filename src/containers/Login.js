import React, { Component } from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import config from '../config.js';



const loginFormStyle = {
  textAlign: 'center',
  width: '90%',
  maxWidth: '90%'
};

const loginButtonStyle = {
  paddingTop: '1em',
  textAlign: 'center',
}

const loginTitleStyle = {
  textAlign: 'center',
  fontWeight: '500',
  fontSize: '20px',
  paddingRight: '0',
}

const wrapperStyle = {
  textAlign: 'center',
  maxWidth: '600px',
  margin: '50px auto',
  paddingLeft: '1em',
  paddingRight: '1em',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const authenticationData = {
      Username: username,
      Password: password
    };

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      const userToken = await this.login(this.state.username, this.state.password);
      this.props.updateUserToken(userToken);
      this.props.history.push("/");
    } catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  render() {
    const actions = [
      <RaisedButton
        label="Login"
        primary={true}
        onTouchTap={this.handleSubmit}
        contentStyle={loginFormStyle}
      />,
    ];

    return (
      <div >
        <Card style={wrapperStyle}>
          <CardHeader
            title="Login"
            textStyle={loginTitleStyle}
          />
          <TextField
            floatingLabelText="Email"
            id={'username'}
            value={this.state.username}
            onChange={this.handleChange}
            style={loginFormStyle}
          /><br />
          <TextField
            floatingLabelText="Password"
            type="password"
            id={'password'}
            value={this.state.password}
            onChange={this.handleChange}
            style={loginFormStyle}
          /><br />
          {this.state.isLoading
            ? (<CircularProgress/>)
            : (<CardActions>{actions}</CardActions>)
          }
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);
