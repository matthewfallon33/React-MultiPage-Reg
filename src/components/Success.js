import React, { Component } from 'react';
import { Dialog, Button } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Header from './Header';

export class Success extends Component {

  render() {
    const { values, goTo } = this.props;
    // values: fname, lname, DOB, email, address
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Dialog
            open={true}
            fullWidth={true}
            maxWidth='sm'
          >
            <Header text="Registration Complete!" />
            <br />

            <p style={{textAlign: 'center', fontFamily: 'verdana'}}>Thanks for Signing up {values.fname}</p>

            <Button
              color="secondary"
              variant="contained"
              onClick={goTo(1)}
            >Back to Start</Button>

          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Success;
