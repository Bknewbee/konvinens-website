import React, {useEffect, useState} from 'react';
import {Tooltip,Grid} from "@material-ui/core";
import axios from 'axios';

import logo from './icons8-settings.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import styles from './styling/...'
import KonvinensBar from './konvinensBar.js';
import Product from "./product.js";
import UserRegistration from './forms/userRegistration';
import LogIn from './forms/logIn';
import './App.css';
import products from "./productItems.js";

function App() {
  let [user, setUser] = useState(null);

  const [msg, setMsg] = useState({});

  const logged = () =>{
    setUser({name: "John Doe"});
  }
  const logOut = () => {
    setUser(null);
    setMsg({msgText: "logged out"});
    /*
    let config = {
      withCredentials: true
    }

    axios.get(`http://localhost:3000/api/user-logout`, config)
      .then((res)=> {
        setMsg(res.data.msg);
        setUser(null);
      })
      .catch((err)=> console.log(err))
      */
  }
  const getuser = () =>{
    let config = {
      withCredentials: true
    }

    axios.get(`http://localhost:3000/api/user`, config)
      .then((res)=> {
        console.log(res);
        setUser(res.data.user);
      })
      .catch((err)=> console.log(err))

  }
  useEffect(()=>{
    getuser();
  }, []);
  return (
    <div className="App">
      <Router>
        <KonvinensBar user={user}/>
        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Konvinens Coming soon
              </p>
              {user ? <div><h1>Welcome <br/><i>{user.name}</i><hr/></h1><button onClick={logOut}>Log Out</button></div>:<Tooltip title="click to log in as John Doe to see changes"><button className="btn" onClick={logged}>Log in as John</button></Tooltip>}
              {msg ? <h1>{msg.text}</h1>:<div></div>}
            </header>
            <main style={{backgroundColor:"white", minHeight: "90vh",padding:"20px"}}>
              <h1><u>Product info sample</u></h1>
              <Grid container spacing={1} justify="center">
              {
                products.map((product, i)=>{
                  return <Grid item key={i}><Product img={product.img} name={product.name} owner={product.owner} description={product.description} price={product.price} promoPrice={product.promoPrice} onSale={product.onSale}></Product></Grid>
                })
              }
            </Grid>
            </main>
          </Route>
          <Route path="/log-in">
            <LogIn></LogIn>
          </Route>
          <Route path="/user-registration">
            <UserRegistration/>
          </Route>
        </Switch>
      </Router>
    {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}

export default App;
