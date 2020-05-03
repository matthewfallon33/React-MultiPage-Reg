import React, { Component } from 'react';
import { InputAdornment, Button, Dialog, TextField } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { RemoveRedEye } from '@material-ui/icons';
import Header from './Header';

export class PwdInfo extends Component {

  constructor(props){
    super(props);
    this.validatePwd = this.validatePwd.bind(this);

    this.state = {
      pwdConf: '',
      pwdError: '',
      pwd1Masked: true,
      pwd2Masked: true
    }

    // this.clearError = this.clearError.bind(this);
  }

  continue = e => {
    e.preventDefault();
    if(this.validatePwd(this.props.values.password, this.state.pwdConf)){
      this.props.nextStep()
    };
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  clearError = () => {
    this.setState({
      pwdError: ''
    })
  };

  validatePwd = (pwd, pwd2) => {

    if(this.state.pwdError !== ''){
      this.clearError();
    }

    if(pwd === pwd2){
      var pwdCriteria =  (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
      if(pwd.match(pwdCriteria)){
        return true;
      } else{
        this.setState({
          pwdError: 'Password must include one uppercase and lowercase character, a number and a symbol!'
        })
      }
    }else{
      this.setState({
        pwdError: 'Both Passwords must match!'
      })
    }
    return false;
  }

  handlePwdConf = (e) => {
    this.setState({
      pwdConf: e.target.value
    })
  }

  togglePasswordMask = (e, pwdMask) => {
  this.setState(prevState => ({
    [pwdMask]: !prevState[pwdMask]
  }));
};

  render() {
    const { values, handleChange } = this.props;
    // fname, lname, DOB, email, address
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Dialog
            open={true}
            fullWidth={true}
            maxWidth='sm'
          >
            <Header text="Create a Password"/>
            <TextField
            type={this.state.pwd1Masked ? 'password' : 'text'}
              placeholder="Enter Password"
              label="Password"
              onChange={(e) => handleChange('password', e.target.value) }
              defaultValue={values.password}
              margin="normal"
              fullWidth={true}
              InputProps={{
                endAdornment: (
              <InputAdornment position="end">
                  <RemoveRedEye
                  onClick={(e) => {
                    this.togglePasswordMask(e, "pwd1Masked")}}
                    />
              </InputAdornment>
          ),
        }}
            />
            <br />
            <TextField
            type={this.state.pwd2Masked ? 'password' : 'text'}
              placeholder="Confirm Password"
              label="Password Confirmation"
              defaultValue=""
              onChange={this.handlePwdConf}
              margin="normal"
							fullWidth={true}
              InputProps={{
                endAdornment: (
              <InputAdornment position="end">
                  <RemoveRedEye
                  onClick={(e) => {
                    this.togglePasswordMask(e, "pwd2Masked")}} />
              </InputAdornment>
          ),
        }}
            />

            <br />
            {
                  <p style={{color:'red', textAlign:'center'}}>{this.state.pwdError}</p>
            }
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default PwdInfo;
