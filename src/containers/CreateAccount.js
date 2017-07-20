import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const wrapperStyle = {
  textAlign: 'center',
  maxWidth: '600px',
  margin: '50px auto',
  paddingLeft: '1em',
  paddingRight: '1em',
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
    };
  }

  validateForm() {
    return this.state.username.length > 0
    && this.state.password.length > 0
    && this.state.password === this.state.confirmPassword;
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });
    this.setState({ newUser: 'test' });
    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
  }

  renderConfimrationForm() {
    return (
      <Card style={wrapperStyle}>
        <form onSubmit={this.handleConfirmationSubmit}>
          <TextField
            autoFocus
            floatingLabelText="Confirmation Code"
            id={'confirmationCode'}
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <CardActions>
            <RaisedButton
              label="Verify"
              type="submit"
              primary={true}
              disabled={ ! this.validateConfirmationForm() }
            />
          </CardActions>
        </form>
      </Card>
    );
  }
  renderForm() {
    return (
      <Card style={wrapperStyle}>
      <CardHeader title="Create Account" />
        <form onSubmit={this.handleSubmit}>
          <TextField
            autoFocus
            floatingLabelText="Email (this will be your username)"
            id={'username'}
            value={this.state.username}
            onChange={this.handleChange}
          /><br />
          <TextField
            floatingLabelText="Password"
            id={'password'}
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          /><br />
          <TextField
            floatingLabelText="Confirm Password"
            id={'confirmPassword'}
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          /><br />
          <CardActions>
            <RaisedButton
              label="Submit"
              type="submit"
              primary={true}
              disabled={ ! this.validateForm() }
            />
          </CardActions>
        </form>
      </Card>
    );
  }

  render() {
    return (
      <div className="CreateAcccount">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfimrationForm() }
      </div>
    );
  }
}

export default withRouter(CreateAccount);
