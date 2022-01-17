import React, {useEffect, useState} from 'react';
//import {Grid} from "@material-ui/core";
import axios from 'axios';

import logo from './icons8-settings.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import styles from './styling/...'
//Site
import './App.css';
import KonvinensBar from './konvinensBar.js';
//import Product from "./productCard.js";
import ProductDetails from './productDetails.js';
import Checkout from "./checkout";
import GetProducts from "./getProducts";
import EmailConfirmation from "./emailConfirmation.js";

//User
import UserAccount from "./userAccount.js";
//Services
import StorePage from './service-pages/storePage';
import EditStoreDetails from './service-pages/editStore';
import ProductManagement from './service-pages/productManagement';
//Forms
import UserRegistration from './forms/userRegistration';
import LogIn from './forms/logIn';
import ServiceRegistrationForm from './forms/serviceRegistrationForm';
import Reset from './forms/reset';

//custom hook for localStorage
/*
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    sessionStorage.getItem(localStorageKey) || ''
  );
  useEffect(()=>{
    sessionStorage.setItem(localStorageKey, value);
  },[value,localStorageKey]);
  return [value, setValue];
};
*/

function App() {
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({});


  useEffect(()=>{
    getuser();
  }, []);

  const logOut = () => {
    let config = {
      withCredentials: true
    }
    axios.get(`https://konvinens.herokuapp.com/api/user-logout`, config) ///api/user-logout
      .then((res)=> {
        setMsg(res.data.msg);
        setUser(null);
      })
      .catch((err)=> console.log(err))
  }
  const getuser = () =>{
    setLoading(true);
    let config = {
      withCredentials: true
    }

    axios.get(`https://konvinens.herokuapp.com/api/api/user`, config) //
      .then((res)=> {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err)=> console.log(err))

  }


  return (
    <div className="App">
      <Router>
        <KonvinensBar user={user} loading={loading}/>
        <Switch >
          <Route exact path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Konvinens Coming soon
              </p>
              {user ? <div><h1>Welcome <br/><i>{user.name}</i><hr/></h1><button onClick={logOut}>Log Out</button></div>:<a href="/log-in">Log in</a>}
              {msg ? <h1>{msg.text}</h1>:<div></div>}
            </header>
            <main style={{backgroundColor:"white", minHeight: "90vh",padding:"20px"}}>
              <GetProducts filter="electronics"/>
              <GetProducts filter="gardening tools"/>
              <GetProducts filter="doors"/>
            </main>
          </Route>
          <Route path="/log-in">
            <LogIn></LogIn>
          </Route>
          <Route path="/user-registration">
            <UserRegistration/>
          </Route>
          <Route path="/product/:productId">
            <ProductDetails />
          </Route>
          <Route exact path="/your-account">
            <UserAccount />
          </Route>
          <Route exact path="/your-account/login&security">
            <EditStoreDetails/>
          </Route>
          <Route path="/emailConfirmation/:userId/:code">
            <EmailConfirmation/>
          </Route>
          <Route path="/service-registration">
            <ServiceRegistrationForm/>
          </Route>
          <Route exact path="/store-service/:storeName">
            <StorePage/>
          </Route>
          <Route path="/store-service/:storeName/edit-service-details">
            <EditStoreDetails/>
          </Route>
          <Route path="/store-service/:storeName/product-management">
            <ProductManagement/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/reset">
            <Reset/>
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
