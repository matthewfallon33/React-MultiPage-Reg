import React, { Component } from 'react';
import { Dialog, Button } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Header from './Header';

export class Landing extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  componentWillMount(){
    this.props.resetState();
  }

  render() {
    return (
      <MuiThemeProvider >
        <React.Fragment>
        <Dialog
            open="true"
            fullWidth="true"
            maxWidth='sm'
          >
      <Header text="Welcome!"/>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Register!</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Landing;
