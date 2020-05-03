import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Dialog, Button, ListItemAvatar, Avatar } from '@material-ui/core';
import { Work as WorkIcon, HighlightOff as HighlightOffIcon } from '@material-ui/icons';
import Header from './Header';

export class WorkExp extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    const { values, goTo, deleteExp } = this.props;
        return (
          <MuiThemeProvider >
            <React.Fragment>
            <Dialog
                open="true"
                fullWidth="true"
                maxWidth='sm'
              >
                <Header text="Work Experience"/>

                <List>

                  {values.workExp.length < 1 &&
                    <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="No Work Experience Added" />
                      </ListItem>
                  }
      {
        values.workExp.length > 0 &&
        values.workExp.map((exp, index) => {
  		return(
        <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={exp.role} secondary={exp.from + " - " + exp.to} />
            <ListItemText primary={exp.desc} />
            <HighlightOffIcon onClick={() => {
              deleteExp(index)
            }}/>
          </ListItem>  		);
  	})}
    </List>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.continue}
                >Add Job</Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={goTo(6)}
                >Continue!</Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.back}
                >Back!</Button>

              </Dialog>
            </React.Fragment>
          </MuiThemeProvider>
        );
  }
}

export default WorkExp;
