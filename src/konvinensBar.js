import React from 'react';
import axios from 'axios';
import LoadingIndicator from './loadingIndicator';

import navLogo from './images/nav-logo.png';
import "./konvinensBar.css";
//import Cart from "./cart.js" ;




function KonvinensBar (props){



  const logOut = () => {
    let config = {
      withCredentials: true
    }
    axios.get(`https://konvinens.herokuapp.com/api/user-logout`, config)
      .then((res)=> {
        console.log(res.data);
        alert('logging out')
        setTimeout(function () {
           // after 2 seconds
           window.location = res.data.redirect;
        }, 500)
        //setUser(null);
      })
      .catch((err)=> console.log(err))
  }

  return(
    <div>
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={navLogo} width="200" className="img-fluid" alt="Company Logo"></img>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationBar" aria-controls="navigationBar" aria-expanded="false" aria-label="Toggle navigation ">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav search">
        <li className="nav-item" >
          <form >
            <div>
              <label className="sr-only" htmlFor="inlineFormInputGroup">Search</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">All</div>
                </div>
                <input disabled type="text" className="form-control" id="SearchItems" placeholder="Search"/>
              </div>
            </div>
          </form>
        </li>
      </ul>

      <div id="navigationBar" className="collapse navbar-collapse mr-auto">
          {
            props.loading ?
            <LoadingIndicator/>
            :
            props.user
            ?
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link" href="/checkout">Cart</a>
                {/*
                <button className="nav-link btn dropdown-toggle" type="button" id="cartDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cart</button>
                <div className="dropdown-menu" aria-labelledby="cartDropdown">
                  <a className="dropdown-item">sdfs</a>
                </div>
                <Cart/>
                */}
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={logOut}>Log out</button>
              </li>
              <li className="nav-item" align="left">
                <a href="/your-account" className="nav-link" disabled>Account</a>
              </li>
            </ul>
            :
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" align="left">
                <a className="nav-link" href="/log-in">Log in</a>
              </li>
              <li className="nav-item" align="left">
                <a className="nav-link" href="/user-registration">Register</a>
              </li>
            </ul>
          }
      </div>
    </nav>
  </div>
  )
}

export default KonvinensBar;
