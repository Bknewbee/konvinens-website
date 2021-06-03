import React from 'react';

import navLogo from './images/nav-logo.png';
import "./konvinensBar.css";

function KonvinensBar (props){

  const showCart = () => {
    console.log('show cart items');
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
          {props.user
            ?
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="nav-link btn" disabled onClick={showCart}>Cart</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" disabled>Log out</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" disabled>Account</button>
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
