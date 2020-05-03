import React, { Component } from 'react';
import WorkIcon from '@material-ui/icons/Work';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Chip, Button, Typography, Dialog } from '@material-ui/core';
import Header from './Header';

export class Industries extends Component {

componentWillMount(){
  this.setState({
    workedIn: [...this.props.values.workedIn]
  })
}

componentWillUnmount() {

  this.props.setIndustries(this.state.workedIn);

  }
constructor(props){
  super(props);

  this.state = {
    workedIn: []
  }
}

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  handleClick = industry => {
    let containsInd = this.state.workedIn.includes(industry);
    // return containsInd ? this.removeIndustry(industry) : this.addIndustry(industry);
    if(containsInd){
      this.removeIndustry(industry);
    } else{
      this.addIndustry(industry);
    }
    this.props.setIndustries([...this.state.workedIn]);
  }

  addIndustry = (industry) => {
    this.setState({
      workedIn: [...this.state.workedIn, industry]
    })
  }

  removeIndustry = (industry) => {
    this.setState({
      workedIn: this.state.workedIn.filter((ind) => {
      return ind !== industry
  })
    })
  }

  setChipColor = (industry) => {
    return "primary";
  }

  render() {
    const { goTo } = this.props;
    const industries = ["Automotive", "Accounting", "Technology",
     "Food Services", "Agriculture", "Banking", "Education", "Electronics",
     "Health", "Manufacturing", "Other"];
    return (
      <MuiThemeProvider >
        <React.Fragment>
        <Dialog
            open="true"
            fullWidth="true"
            maxWidth='sm'
          >
            <Header text="Industries Worked In"/>
            <div style={{margin: '5%', textAlign: 'center'}}>
            <Typography variant="h5" style={{textAlign: 'center'}}>
            Please Select the Industries you have worked in...
            </Typography>
            <br />
            {industries.map((industry, index) => {
              return(
                <Chip
                      variant="outlined"
                      size="small"
                      style={{margin: '1%'}}
                      icon={<WorkIcon />}
                      label={industry}
                      onClick={() => {
                        this.handleClick(industry);
                      }}
                      clickable
                      color={this.state.workedIn.includes(industry) ? "primary": "secondary"}
                    />
                  );
            })}
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue!</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={goTo(4)}
            >Back!</Button>

          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Industries;
