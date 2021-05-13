import React, {useEffect, useState} from 'react';
import axios from 'axios';

import logo from './icons8-settings.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import styles from './styling/...'
import UserRegistration from './forms/userRegistration';
import LogIn from './forms/logIn';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState({})
  const logOut = () => {
    let config = {
      withCredentials: true
    }

    axios.get(`https://konvinens.herokuapp.com/api/user-logout`, config)
      .then((res)=> {
        setMsg(res.data);
        setData(null);
      })
      .catch((err)=> console.log(err))
  }
  const getuser = () =>{
    let config = {
      withCredentials: true
    }

    axios.get(`https://konvinens.herokuapp.com/api/user`, config)
      .then((res)=> {
        console.log(res.data);
        setData(res.data)
      })
      .catch((err)=> console.log(err))

  }
  useEffect(()=>{
    getuser();
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              {data ? <div><h1>Welcome <br/><i>{data.name}</i><hr/></h1><button onClick={logOut}>Log Out</button></div>: <div></div>}
              {msg ? <h1>{msg.text}</h1>:<div></div>}
              <p>
                Konvinens Coming soon
              </p>
              <a href="/user-registration">Test user registration</a>
              <a href="/log-in">Test user log in</a>


            </header>
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
