import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './editUserAccount.css';
//import checked from './check-circle-regular.svg';
//import cross from './times-circle-regular.svg';
/*
class EditUserAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      field: ''
    }
    this.getUser = this.getUser.bind(this);
    this.editField = this.editField.bind(this);
  }

  getUser(){
    let config = {
      withCredentials: true
    }
    this.setState({user: {name: "Ben", email:"@asdfasdsdf", number: "75214847"}});
  }

  editField(field){
    this.setState({field: field})
  }

  render(){
    return(
      <div id="EditUserAccount">
        <h1>Edit Your Account</h1>
        {
          this.state.user ?
          <div className="row">
            <div className="col-8 d-flex justify-content-between"><p>Name: {this.state.user.name}</p></div>
            <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{this.editField("name")}}>edit</button></div>
            <div className="col-8 d-flex justify-content-between"><p>Email: {this.state.user.email}</p></div>
            <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{this.editField("email")}}>edit</button></div>
            <div className="col-8 d-flex justify-content-between"><p>Mobile Number: {this.state.user.number}</p></div>
            <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{this.editField("number")}}>edit</button></div>
          </div>
          :
          <div>
            Not logged in
          </div>
        }

          <div class="modal fade" id="edit-details" tabindex="-1" role="dialog" aria-labelledby="e-mail" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="e-mail">Edit {this.field}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form class="modal-body">
                  <input value={this.state.user.[this.state.field]} name={this.state.user.[this.state.field]}></input>
                  <div class="modal-footer d-flex justify-content-end">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" >Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>


      </div>
    )
  }
}
*/
function EditUserAccount (){

  const [user, setUser] = useState(null);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');

  useEffect(()=>{
    getUser();
  }, []);

  const getUser = () => {
    let config = {
      withCredentials: true
    }
    //setUser({name: "Ben", email:"@asdfasdsdf", phoneNumber: "75214847", serviceProvider: false, confirmation: false})
    axios.get(`https://konvinens.herokuapp.com/api/user-details`, config)
      .then((res)=> {
        console.log(res);
        setUser(res.data.user);
      })
      .catch((err)=> console.log(err))
  }
  const editField = (field) => {
    console.log(user.[field])
    setValue(user.[field]);
    setField(field);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = {
      id: user._id,
      field: field,
      previousVal: user.[field],
      value: value,
    }
    let config = {
      withCredentials: true
    }

    axios.post(`https://konvinens.herokuapp.com/api/user-make-changes`, formData, config)
      .then((res)=>{
        console.log(res.data);
        //setMsg(res.data);
        setTimeout(function () {
           // after 2 seconds
           window.location = res.data.redirect;
        }, 1500)
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  return(
    user ?
    <div id="EditUserAccount">
      <h1>Edit Your Account</h1><i className="far fa-check-circle"></i>
        <div className="row">
          <div className="col-8 d-flex justify-content-between"><p>Name: {user.name}</p></div>
          <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("name")}}>edit</button></div>
          <div className="col-8 d-flex justify-content-between"><p>Email: {user.email}</p></div>
          <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("email")}}>edit</button></div>
          <div className="col-8 d-flex justify-content-between"><p>Mobile Number: {user.phoneNumber}</p></div>
          <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("phoneNumber")}}>edit</button></div>

          <div className="col-12 d-flex justify-content-around">Acount Virification: {user.confirmation ? <p>verified</p>: <p>Not verified</p>}</div>
        </div>

        <div className="modal fade" id="edit-details" tabIndex="-1" role="dialog" aria-labelledby="e-mail" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="e-mail">Change {field}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="modal-body">
                <p>New {field}</p>
                <input value={value} onChange={e => setValue(e.target.value)} name={user.[field]}></input>
                <div className="modal-footer d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" >Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    :
    <div id="EditUserAccount">
      Please log in <a href="/log-in">Log in</a>
    </div>
  )
}

export default EditUserAccount;
