import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  useRouteMatch,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography} from '@material-ui/core';

import LoadingIndicator from './loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 350,
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 168,
    height: 112,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function ServiceManagement (){
  const classes = useStyles();

  let match = useRouteMatch();
  let linkArray = Array.from(match.url.split('/'));

  const [services, setServices] = useState([]);
  const [msg, setMsgs] = useState(null);

  useEffect(()=>{
    getServices();
  }, []);

  const getServices = async() => {
    let config = {
      withCredentials: true
    }
    //setUser({name: "Ben", email:"@asdfasdsdf", phoneNumber: "75214847", serviceProvider: false, confirmation: false})
    await trackPromise(axios.get(`https://konvinens.herokuapp.com/api/get-services`, config)
      .then((res)=> {
        console.log(res.data);
        if(res.data.user){
          setServices(res.data.services);
        }else {
          setMsgs(res.data.msg)
          setTimeout(function () {
             // after 2 seconds
             window.location = '/log-in';
          }, 2000)
        }
      })
      .catch((err)=> console.log(err))
    )
  }

  return(

    <div id="ServiceManagement">
      <a href={"/"+linkArray[1]}>{linkArray[1]}</a>
      <h1 >Service Management</h1>
      <hr style={{borderBottom: "black solid 1px"}}/>
      {msg ? <p className={msg.param}>{msg.text}</p>: <p></p>}
      {
        services.length > 0 ?
        services.map((service, i)=>{
          return <div key={i} className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2} style={{background:"green"}}>
                <Grid item xs={6}>
                  <div className={classes.image}>
                    <img className={classes.img} alt="Company Logo" src={"data:"+service.logoImage.contentType+";base64,"+service.logoImage.imgBuffer}></img>
                  </div>
                </Grid>
                <Grid item xs={6} container>
                  <Grid item xs container direction="column" spacing={1} style={{paddingTop:"40px"}}>
                    <Typography><a href={"/store-service/"+service.name}>Manage {service.name}</a></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        })
        :
        <div><LoadingIndicator/></div>
      }
      <a href="/service-registration">Regiser a service</a>
    </div>
  )
}

export default ServiceManagement;
