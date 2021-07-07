import React, {useState} from 'react';
import {Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import axios from 'axios';

//node mailer
//import nodemailer from 'nodemailer';

import useStyles from '../styling/styles';
import './userRegistration.css';
import logo from '../images/logo.png';

//const FormData = require('form-data');

const UserRegistration = (props) => {

  const classes = useStyles();

  const [state, setState] = useState({
    termsAndConditions: false,
    serviceProvider: false,
  });

  //test
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [msg, setMsg] = useState();


  const handleChange = (event) =>{
    setState({...state, [event.target.name]: event.target.checked})
  }


  const handleSubmit = (event) =>{
    event.preventDefault();
    if(password2 !== password){
      setMsg({param: 'alert alert-danger', text: 'Passwords are not the same'});
    }else{
      let formData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        termsAndConditions: state.termsAndConditions,
        serviceProvider: state.serviceProvider
      }
      let config = {
        withCredentials: true
      }
      if(state.termsAndConditions){
        axios.post(`https://konvinens.herokuapp.com/api/user-registration`, formData, config)
          .then((res)=>{
            console.log(res);
            setMsg(res.data.msg);
          })
          .catch((err)=>{
            console.log(err);
          })
      }else{
        alert('Can not create account with out agreeing to terms and conditions')
      }
    }


  }


  return(
    <Paper id="UserRegistration" elevation={5} className={classes.paperStyle}>
      {msg ? <div className={msg.param}>{msg.text}</div> : <div></div>}
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
        <form onSubmit={handleSubmit}>
          <TextField required fullWidth label="Name" name="name" placeholder="Full Personal Name or Company Name" onChange={e => setName(e.target.value)} value={name}/>
          <TextField required fullWidth label="E-mail" name="email" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} value={email}/>
          <TextField required fullWidth label="Phone Number" name="phone-number" placeholder="Enter Phone Number" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber}/>
          <TextField required fullWidth label="Password" name="password" type="password" placeholder="Password should be more than 5 characters" onChange={e => setPassword(e.target.value)} value={password}/>
          <TextField required fullWidth label="Confirm Password" name="password2" type="password" placeholder="Enter the same password" onChange={e => setPassword2(e.target.value)} value={password2}/>

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
