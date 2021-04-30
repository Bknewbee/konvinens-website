import React from 'react';
import {Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, FormControlLabel} from '@material-ui/core';
//node mailer
//import nodemailer from 'nodemailer';

import useStyles from '../styling/styles';
import './userRegistration.css';
import logo from '../images/logo.png';

const UserRegistration = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    termsAndConditions: false,
    serviceProvider: false,
  });

  const handleChange = (event) =>{
    setState({...state, [event.target.name]: event.target.checked})
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    if(state.termsAndConditions === false){
      alert('Can not create account with out accepting the Terms and Conditions')
    }else{
      alert('Will register');
    }

  }

  return(
    <Paper elevation="5" className={classes.paperStyle}>
      <Grid container style={{minHeight: '90vh'}}>
        <Grid item sm={5} className={classes.logIn}>
          <img className={"img-fluid"} src={logo} alt="Konvinens Logo"></img>
        </Grid>
        <Grid item sm={7} className={classes.formStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
          </Avatar>
          <h1 className={classes.headerStyle}>Welcome to Konvinens</h1>
          <Typography variant="caption" gutterBottom>
            Complete the form to create account
          </Typography>
        </Grid>
        <form submit={handleSubmit} action="POST" data-netlify="true">
          <TextField required fullWidth label="Name" name="name" placeholder="Full Personal Name or Company Name"/>
          <TextField required fullWidth label="E-mail" name="email" placeholder="Enter email address"/>
          <TextField required fullWidth label="Phone Number" name="phone-number" placeholder="Enter Phone Number"/>
          <TextField required fullWidth label="Password" name="password" placeholder="Password should be more than 5 characters"/>
          <TextField required fullWidth label="Confirm Password" name="confirm-password" placeholder="Enter the same password"/>

          <div data-netlify-recaptcha="true"></div>

          <FormControlLabel
            control={<Checkbox
                      checked={state.serviceProvider}
                      onChange={handleChange}
                      name="serviceProvider"
                    />}
            label="I would like to register as a service provider"
          />
          <FormControlLabel
            control={<Checkbox
                      checked={state.termsAndConditions}
                      onChange={handleChange}
                      name="termsAndConditions"
                    />}
            label="I acccept the terms and conditions"
          />
          <br/>
          <Button  type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
        <br/>
        Already have an acount <br/><a href="/log-in">Log In</a>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default UserRegistration
