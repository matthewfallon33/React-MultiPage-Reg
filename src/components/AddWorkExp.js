import React, { Component } from 'react';
import { TextareaAutosize, Dialog, TextField, Button } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Header from './Header';
import '../index.css';


export class AddWorkExp extends Component {

  constructor(props){
    super(props);

    this.state = {
      role: '',
      from: '',
      to:'',
      desc: ''
    }
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleChange = input => e => {
      this.setState({ [input]: e.target.value });
  };

  render() {
    const { addExp, prevStep } = this.props;
    // fname, lname, DOB, email, address
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Dialog
            open={true}
            fullWidth={true}
            maxWidth='sm'
          >
            <Header text="Add Work Experience" />
            <TextField
              placeholder="Job Title"
              label="Job Title"
              defaultValue=''
              margin="none"
              onChange={this.handleChange("role")}
              fullWidth={true}
            />
            <br />
            <TextField
              label="From"
              placeholder=""
              type="date"
              defaultValue=""
              margin="none"
              onChange={this.handleChange("from")}
							fullWidth={true}
            />
            <br />
            <TextField
              label="To"
              placeholder=""
              type="date"
              defaultValue=""
              margin="none"
              onChange={this.handleChange("to")}
              fullWidth={false}
            />
            <br />
            <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  onChange={this.handleChange("desc")}
                  placeholder="Minimum 3 rows"/>
            <br />

            <Button
              color="secondary"
              variant="contained"
              fullWidth={false}
              onClick={() => {
                addExp(this.state);
                prevStep();
                 // all work exp section...
              }}
            >Add Job</Button>

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
              fullWidth={false}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
              fullWidth={false}
            >Continue</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default AddWorkExp;
