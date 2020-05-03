  import React from 'react';
import UserInfo from './UserInfo';
import Landing from './Landing';
import PwdInfo from './PwdInfo';
import WorkExp from './WorkExp';
import AddWorkExp from './AddWorkExp';
import Industries from './Industries';
import Review from './Review';
import Success from './Success';

class UserRegForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.setInitialState();

    this.handleChange = this.handleChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.goTo = this.goTo.bind(this);
    this.addExp = this.addExp.bind(this);
    this.setIndustries = this.setIndustries.bind(this);
    this.deleteExp = this.deleteExp.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  setInitialState = () => ({
          step: 1,
          fname: '',
          lname: '',
          DOB: '',
          email: '',
          address: '',
          password: '',
          workExp: [],
          workedIn: []
  });

  resetState = () => {
     this.setState(this.setInitialState());
  }

  nextStep = () => {
    this.setState((prevState, props)=> {
      return {step: prevState.step + 1};
    })
  }

  prevStep = () => {
    this.setState((prevState, props)=> {
      return {step: prevState.step - 1};
    })
  }

  goTo = (step) => e => {
    this.setState({ step })
  }

// custom handler for adding new work experience
  addExp = (exp) => {
    this.setState((prevState, props) => {
      return {
        workExp: [...prevState.workExp, exp]
      }
    });
  }

// custom handler for deleting a work experience
  deleteExp = (index) => {
    this.setState({
      workExp: this.state.workExp.filter((exp, i) => {
        return i !== index
      })
    });
  }

// custom handler for adding new work industries
  setIndustries = (industries) => {
    this.setState({
      workedIn: [...industries]
    })
  }

// generic handler for text based input events
  handleChange = (input, value) => {
      this.setState({ [input]: value });
  };

  render(){
    const { step } = this.state;
    const {fname, lname, DOB, email, address, password, workExp, workedIn} = this.state;
    const values = {fname, lname, DOB, email, address, password, workExp, workedIn};

    switch(step){

      case 1:
      return (
          <Landing
           resetState={this.resetState}
           nextStep={this.nextStep}
          />
        )
      break;

      case 2:
      return (
          <UserInfo
           nextStep={this.nextStep}
           prevStep={this.prevStep}
           handleChange={this.handleChange}
           values={values}
           />
      )
      break;

      case 3:
      return (
          <PwdInfo
           nextStep={this.nextStep}
           prevStep={this.prevStep}
           handleChange={this.handleChange}
           values={values}
          />
      );
      break;

      case 4:
      return(
        <WorkExp
          goTo={this.goTo}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          values={values}
          deleteExp={this.deleteExp}
        />
      );
      break;

      case 5:
      return(
          <AddWorkExp
           goTo={this.goTo}
           addExp={this.addExp}
           nextStep={this.nextStep}
           prevStep={this.prevStep}
          />
        );
        break;

        case 6:
        return(
          <Industries
            nextStep={this.nextStep}
            goTo={this.goTo}
            setIndustries={this.setIndustries}
            handleChange={this.handleChange}
            values={values}
          />
        );
        break;

        case 7:
          return(
            <Review
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          );
          break;

        case 8:
          return(
         <Success
           goTo={this.goTo}
           clearInfo={this.clearInfo}
           values={values}
          />
            );
            break;
    }

  }

}

export default UserRegForm;
