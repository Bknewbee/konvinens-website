import React from 'react';
import axios from 'axios';


import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';



import './reset.css';
/*
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

let selectedOption = 'e-mail';

function getSteps() {
  return ['Select confirmation method', 'Create an ad group', 'Create an ad'];
}

function one() {
  const options = ['e-mail','phone'];

  return (
    <div>
      <label htmlFor="options">Choose confirmation method:</label>
      <select name="option" id="options" value={selectedOption} onChange={(e)=>{console.log(e.target.value)}}>
        {
          options.map((option,i)=>(
            <option key={i} >{option}</option>
          ))
        }
      </select>
    </div>
  )
}
function two (){
  return(
    <div>{selectedOption}</div>
  )
}

function getStepContent(step,) {
  switch (step) {
    case 0:
      return one();
    case 1:
      return two();
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

function HorizontalLinearStepper(selectedOption) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep,selectedOption)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

*/

function Reset (){
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState(null);
  const [reset, setReset] = React.useState(false);

  const passwordChange = async(event) => {
    event.preventDefault()
    let data = {email: email}
    const formData = new FormData(event.target);

    for (var [key, value] of formData.entries()) {
      //console.log(key, value);
      data[key] = value
    }
    const config = {
      withCredentials: true
    }
    setMsg(null);
    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/password-reset`, data, config)
      .then((res)=>{
        console.log(res.data);
        setMsg(res.data.msg);

        if(res.data.redirect){
          setTimeout(function () {
             // after 2 seconds
             window.location = '/log-in';
          }, 4)
        }
      })
      .catch((err)=>{
        console.log(err);
      }))
  }
  const handleSubmit = async(event) =>{
    event.preventDefault()
    const config = {
      withCredentials: true
    }

    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/user-reset`, {email: email}, config)
      .then((res)=>{
        console.log(res.data);

        setMsg(res.data.msg);
        setReset(res.data.reset);
      })
      .catch((err)=>{
        console.log(err);
      }))
  }
  return (
    <div id="Reset">
      {
        reset ?
        <form onSubmit={passwordChange} method="post" encType="multipart/form-data" autoComplete="off">
          {
            msg ?
            <div className={msg.param+" my-2"}>{msg.text}</div>
            :
            <LoadingIndicator/>
          }
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Enter 4 digit code without spaces</label>
            <input required name="code" type="text" className="form-control" id="formGroupExampleInput" placeholder="0 0 0 0"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input required name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="New Password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        :
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {
            msg ?
            <div className={msg.param+" my-2"}>{msg.text}</div>
            :
            <LoadingIndicator/>
          }
        </form>
      }


    </div>
  )
}

export default Reset;
