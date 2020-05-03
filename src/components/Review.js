import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Dialog, Button, Chip } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import Header from './Header';

export class Review extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    // fname, lname, DOB, email, address
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <Dialog
            open={true}
            fullWidth={true}
            maxWidth='sm'
          >
            <Header text="Confirmation Details"/>
            <br />
            <List>
            <ListItem>
              <ListItemText primary="Name" secondary={values.fname + " " + values.lname} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date of Birth" secondary={values.DOB} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={values.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" secondary={values.address} />
            </ListItem>

            <ListItem>
              <ListItemText primary="Work Experience:" />
            </ListItem>
            <ListItem>

            {
              values.workExp.length < 1 &&
            <ListItem>
              <ListItemText primary="No Work Experience Recorded..." />
            </ListItem>
            }

            {values.workExp.map((exp, index) => {
                  return(
                      <ListItemText
                        primary={exp.role}
                        secondary={"(" + exp.from + ") - (" + exp.to + ")"} />
                  );
                  })
                }
                </ListItem>

            <ListItem>
              <ListItemText primary="Industries Worked In:"/>
            </ListItem>
            <ListItem>
                {
                    values.workedIn.map((industry, index) => {
                      return (
                        <Chip
                              variant="outlined"
                              size="small"
                              style={{margin: '1%'}}
                              icon={<WorkIcon />}
                              label={industry}
                              clickable
                              color="primary"
                            />
                          );
                    })
                }
            </ListItem>
            </List>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Save & Continue!</Button>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Review;
