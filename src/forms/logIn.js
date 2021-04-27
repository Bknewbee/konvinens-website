import React from 'react'
import {Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';

import useStyles from '../styling/styles';
import './logIn.css';
import logo from "../images/logo.png"


const LogIn = () => {
  const classes = useStyles();

  const handleSubmit = (event) =>{
    event.preventDefault();
    alert('Will log in');
  }

  return(
    <Paper id="logIn"elevation="5" className={classes.paperStyle}>
      <Grid container className="loginStyle">
        <Grid item sm={5} xs={12} className={classes.formStyle}>
          <form onSubmit={handleSubmit}>
            <Avatar className={classes.avatarStyle} style={{margin:'20px auto'}}></Avatar>

            <TextField required fullWidth label="UserName" placeholder="Full Personal Name or Company Name"/>
            <TextField required fullWidth label="Password" placeholder="Full Personal Name or Company Name"/>

            <hr/>

            <Button  type="submit" variant="contained" color="primary">
              Sign Up
            </Button>

          </form>
          <br/>
          <div>
            <p>Dont have an account go on and </p>
            <a href="/user-registration">Create Account</a>
          </div>
        </Grid>
        <Grid item sm={7} xs={12} className={classes.logIn}>
          <img src={logo} className="img-fluid" alt="background"></img>
        </Grid>

      </Grid>

      {/*
      <Grid container >
        <Grid item sm={4} >
          <Paper className={classes.logInForm}>
            <form>
              <TextField required fullWidth label="UserName" placeholder="Full Personal Name or Company Name"/>
              <TextField required fullWidth label="Password" placeholder="Full Personal Name or Company Name"/>
            </form>
          </Paper>
        </Grid>
        <Grid item sm={8} className={classes.logIn} >
          <Grid>
            <div style={{marginTop:"100%"}}>
              <p>Dont have an account go on and </p>
              <a href="/user-registration">Create Account</a>
            </div>
          </Grid>
        </Grid>
      </Grid>
      */}
    </Paper>
  )
}
export default LogIn;
