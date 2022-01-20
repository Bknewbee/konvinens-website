import React from 'react';
import {Grid} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import ServiceManagement from './serviceManagement';
import EditUserAccount from './editUserAccount';
import OrderManagement from './orderManagement';

import "./userAccount.css"

function UserAccount (){
  let match = useRouteMatch();
  return(
    <div id="UserAccount">
      <h1>Your Account</h1>
      <Router>
        <Switch>
          <Route exact path={`${match.path}`}>
            <Grid container>
              <Grid item>
                <div className="card" style={{width: "18em"}}>
                  <Link to={`${match.url}/login&security`}>
                  <div className="card-body">
                    <h5 className="card-title">Login & security</h5>
                    <p>Edit profile details</p>
                  </div>
                  </Link>
                </div>
              </Grid>
              <Grid>
                <div className="card" style={{width: "18em"}}>
                  <Link to={`${match.url}/service-management`}>
                  <div className="card-body">
                    <h5 className="card-title">Service Management</h5>
                    <p>Manage Service details</p>
                  </div>
                </Link>
                </div>
              </Grid>
              <Grid>
                <div className="card" style={{width: "18em"}}>
                  <Link to={`${match.url}/orders-management`}>
                  <div className="card-body">
                    <h5 className="card-title">Order's</h5>
                    <p>Manage order details</p>
                  </div>
                </Link>
                </div>
              </Grid>
            </Grid>
          </Route>
          <Route path={`${match.path}/login&security`}>
            <EditUserAccount/>
          </Route>
          <Route path={`${match.path}/service-management`}>
            <ServiceManagement/>
          </Route>
          <Route path={`${match.path}/orders-management`}>
            <OrderManagement/>
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default UserAccount;
