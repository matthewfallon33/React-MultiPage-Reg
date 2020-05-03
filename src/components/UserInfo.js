import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Container, Button, TextField, Dialog } from '@material-ui/core';
import Autocomplete from 'react-autocomplete';
import Header from './Header';
import '../index.css'; // should use css modules time permitting :(

export class UserInfo extends Component {

  constructor(props){
    super(props);

    this.state = {addresses: [],
                  addrErr: '',
                  fnameErr: '',
                  lnameErr: '',
                  emailErr: '',
                  dobErr: ''
                  };
   }

  async getAddresses(postcode){
    const key = "ak_k9q2wdcjaKRPJ6DaOhbbqdFIoTfhQ";
    let url = "https://api.ideal-postcodes.co.uk/v1/postcodes/" + postcode +"?api_key=" + key;
    fetch(url)
    .then((data) => data.json())
    .then(data => {
      if(data.result){
        if(data.result.length > 0){
          this.setState({addresses: [...data.result]});
        }
      }
    }).catch(err => console.log(err));
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  clearErrs = () => {
    this.setState({
      fnameErr: '',
      lnameErr: '',
      addrErr: '',
      emailErr: '',
      dobErr: ''
    });
  }

  validateInputs = ({fname, lname, address, email, DOB}) => {
    let valid = true;
    if(fname === ''){
      this.setState({fnameErr: 'Please ensure "Firstname" not empty'});
      valid = false;
    }
    if(lname === ''){
      this.setState({lnameErr: 'Please ensure "Lastname" not empty'});
      valid = false;
    }
    if(address === ''){
      this.setState({addrErr: 'Please ensure "Address" not empty'});
      valid = false;
    }
    if(email === ''){
        this.setState({emailErr: 'Please ensure "Email" not empty'});
        valid = false;
    }else{
      if(!this.validateEmail(email)){
        valid = false;
        this.setState({
          emailErr: 'Please ensure email is of correct format e.g. "johndoe@email.com"...'
        });
      }
    }
    if(DOB === ''){
          this.setState({dobErr: 'Please ensure "DOB" not empty'});
          valid = false;
    }
    return valid;
  }

  validateEmail = (email) => {
    const emailCriteria = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailCriteria.test(email)){
      return true;
    }
    return false;
  }

  render() {
    const { values, handleChange } = this.props;
    const styles = {width: '80%', margin:'auto'};
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Container fixed>
        <Dialog
            open="true"
            fullWidth={true}
            maxWidth='sm'
          >
          <Header text="Personal Information"/>
            <TextField
              placeholder="Enter First name"
              label="Firstname"
              onFocus={this.clearError}
              onChange={(e) => handleChange('fname', e.target.value)}
              defaultValue={values.fname}
              styles={styles}
              inputProps={{style: { }}}
            />
            {this.state.fnameErr}
            <br />
            <TextField
              placeholder="Enter Last name"
              label="Last name"
              onChange={(e) => handleChange('lname', e.target.value)}
              defaultValue={values.lname}
              styles={styles}
							inputProps={{style: {  }}}
            />
            {this.state.lnameErr}
            <br />
            <TextField
              placeholder="Enter Your Email Address"
              label="Email"
              onChange={(e) => handleChange('email', e.target.value)}
              defaultValue={values.email}
              styles={styles}
              inputProps={{style: {  }}}
            />
            {this.state.emailErr}
            <br />

            <div class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
            <Autocomplete
              wrapperStyle={{style: {
                      margin: 'auto',
                      content: 'Enter Postcode'
                    }}}
              inputProps={{
                placeholder: 'Enter Postcode',
                class: 'MuiInputBase-input MuiInput-input'
              }}
              items={this.state.addresses}
              getItemValue={item => {if(item) return item.line_1 + " " + item.post_town}}
              renderItem={(item, highlighted) =>
                <div style={{ backgroundColor: highlighted ? '#eee' : 'transparent', width: '100%'}}>
                      {item.line_1 + " " + item.post_town}
                </div>
                }
              value={values.address}
              onChange={e => {
                this.getAddresses(e.target.value)
                handleChange("address", e.target.value)}}
                onSelect={(value) => handleChange("address", value)}
              />
              </div>
                {this.state.addrErr}
            <br />
            <TextField
              id="date"
              placeholder="Enter Your Date of Birth"
              label="Date of Birth"
              onChange={(e) => handleChange('DOB', e.target.value)}
              type="date"
              defaultValue={values.DOB}
              styles={styles}
              InputLabelProps={{
                shrink: true,
              }}
            />
              {this.state.dobErr}
            <br />
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
              fullWidth={false}
            >Back</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
              if(this.validateInputs(values)){
                this.continue(e)
              }
              setTimeout(this.clearErrs, 5000)
              }}
              fullWidth={false}
              >Continue</Button>
          </Dialog>
          </Container>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default UserInfo;
