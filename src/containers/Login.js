import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



const loginFormStyle = {
  textAlign: 'center',
  width: '30%',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={loginFormStyle}
        >
          <TextField
            floatingLabelText="Email"
            fullWidth={true}
          /><br />
          <TextField
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
  }
}

export default Login;
