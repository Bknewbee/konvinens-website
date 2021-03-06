import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import axios from 'axios';
import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

import useStyles from '../styling/styles';
import './logIn.css';
import logo from "../images/logo.png"


const LogIn = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [resend, setResend] =useState(null);

  const resendEmail = () => {
    let config = {
      withCredentials: true
    }

    axios.post(`https://konvinens.herokuapp.com/api/user-req-email`, {email: email}, config) //
      .then((res)=>{
        //console.log(res);
        setMsg({param: "alert alert-success", text:'Email has been sent'});
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();
    let formData = {
      email: email,
      password: password
    }
    let config = {
      withCredentials: true
    }
    setMsg(null);
    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/user-login`, formData, config)
      .then((res)=>{
        //console.log(res);
        setMsg(res.data);
        if(res.data.error){
          setResend(res.data.resend);
          return
        }else{
          setTimeout(function () {
             // after 2 seconds
             window.location = res.data.redirect;
          }, 1500)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    )
  }

  return(
    <Paper id="logIn"elevation={5} className={classes.paperStyle}>
      {msg ? <div className={msg.param}>{msg.text}</div>:<div></div>}
      {resend ? <button onClick={()=>{resendEmail()}} className="btn btn-primary">{resend}</button>:<LoadingIndicator/>}
      <Grid container className="loginStyle">
        <Grid item sm={5} xs={12} className={classes.formStyle}>
          <form onSubmit={handleSubmit}>
            <Avatar className={classes.avatarStyle} style={{margin:'20px auto'}}></Avatar>

            <TextField required fullWidth label="E-mail" name="email" placeholder="e-mail" onChange={e => setEmail(e.target.value)} value={email}/>
            <TextField required fullWidth label="Password" name="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password}/>

            <hr style={{borderBottom: "solid white 1px"}}/>

            <Button  type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </form>
          <br/>
            <div>
              <a href="/reset">forgot password or email</a>
            </div>
          <div>
            <p>Dont have an account go on and </p>
            <a href="/user-registration">Create an Account</a>
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
