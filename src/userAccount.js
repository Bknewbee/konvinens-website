import React from 'react';

import "./userAccount.css"

function UserAccount (){
  return(
    <div id="UserAccount">
      <h1>Your Account</h1>
      <div className="card" style={{width: "18em"}}>
        <a href="your-account/login&security">
        <div className="card-body">
          <h5 className="card-title">Login & security</h5>
          <p>Edit profile details</p>
        </div>
        </a>
      </div>
    </div>
  )
}

export default UserAccount;
