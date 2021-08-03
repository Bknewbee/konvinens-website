import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

import {withRouter} from 'react-router-dom';

import './editStore.css'




function EditStoreDetails (props){

  let [service, setSerivce] = useState(null);
  const [msg, setMsg] = useState(null);
  const [field, setField] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);


  const getServices = async(param) => {
    let config = {
      withCredentials: true
    }
    //setUser({name: "Ben", email:"@asdfasdsdf", phoneNumber: "75214847", serviceProvider: false, confirmation: false})
    await trackPromise(axios.get(`https://konvinens.herokuapp.com/api/get-services`, config)
      .then((res)=> {
        //console.log(res.data);
        //console.log(param);
        if(res.data.user){
          res.data.services.forEach((service, i) => {
            if(service.name === param.storeName){
              //console.log(service);
              setSerivce(service);
            }else{
              console.error("Different");
            }
          });
        }else{
          setMsg({msg:{param:"alert alert-danger", text: "You are not logged \n Redirecting to log in"}})
          setTimeout(function () {
             // after 2 seconds
             window.location = "/log-in";
          }, 1500)
        }


        /*
        if(res.data.user){
          setServices(res.data.services);
        }else {
          setMsgs(res.data.msg)
          setTimeout(function () {
             // after 2 seconds
             window.location = '/log-in';
          }, 2000)
        }
        */
      })
      .catch((err)=> console.log(err))
    )
  }

  const editField = (field, type) => {
    //console.log(service.[field])
    if(type === "file"){
      setValue("");
    }else{
      setValue(service.[field]);
      setFile(null);
    }
    setType(type);
    setField(field);
    setMsg(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(file){
      console.log(file);
      setMsg(null);

      const formData = new FormData(event.target);

      formData.append('id', service._id);
      formData.append('field', field);
      formData.append('previousVal', service.[field]);

      let config = {
        withCredentials: true
      }

      await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/service-store-make-changes`, formData, config)
        .then((res)=>{
          //console.log(res.data);
          //setMsg(res.data);
          setMsg({msg: res.data.msg})/*
          setTimeout(function () {
             // after 2 seconds
             window.location = res.data.redirect;
          }, 1500)*/
        })
        .catch((err)=>{
          console.log(err);
        })
      )

    }else{
      if(!value){
        setMsg({msg:{param: "alert alert-danger", text:"Can not leave field empty"}})
      }else{
        setMsg(null);

        let formData = {
          id: service._id,
          field: field,
          previousVal: service.[field],
          value: value,
        }

        let config = {
          withCredentials: true
        }

        await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/service-store-make-changes`, formData, config)
          .then((res)=>{
            //console.log(res.data);
            //setMsg(res.data);
            setMsg({msg: res.data.msg})
            setTimeout(function () {
               // after 2 seconds
               window.location = res.data.redirect;
            }, 1500)
          })
          .catch((err)=>{
            console.log(err);
          })
        )
      }
    }
  }


  useEffect(()=>{
    let param = props.match.params;
    //console.log(param);
    getServices(param);

  },[props.match.params])
  return (
    <div id="EditStore">
      {
        service ?
        <div>
          <a href="/your-account">Go back to your account</a><br/>
          <a href={"/store-service/"+service.name}>Go back to store management</a>
          <br/>
          <h1>Edit Service Details</h1>
        <div>
          <img className="img-fluid" style={{maxWidth: '300px'}} src={"data:"+service.logoImage.contentType+";base64,"+service.logoImage.imgBuffer} alt="Company Logo"></img>
          <div className="d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details-file" onClick={()=>{editField("logoImage", "file")}}>edit</button></div>
          <hr style={{borderBottom: "solid black 1px"}}/>
          <br/>
            <div className="row">
              <div className="col-8 d-flex justify-content-between"><p>Store Name: {service.name}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("name", "text")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Email: {service.email}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("email", "email")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Primary Contact: {service.primaryContact}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("primaryContact", "number")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Secondary Contact: {service.secondaryContact}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("secondaryContact", "number")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Location: {service.location}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("location", "text")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Physical Address: {service.physicalAddress}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("physicalAddress", "text")}}>edit</button></div>
              <div className="col-8 d-flex justify-content-between"><p>Postal Address: {service.postalAddress}</p></div>
              <div className="col-4 d-flex justify-content-around"><button className="btn" data-toggle="modal" data-target="#edit-details" onClick={()=>{editField("postalAddress", "text")}}>edit</button></div>
              <div className="col-12 d-flex justify-content-around">Acount Virification: {service.verification ? <p>verified</p>: <p>Not verified</p>}</div>
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
                    <input value={value} type={type} onChange={e => { type === "file" ? setFile(URL.createObjectURL(e.target.files[0])) : setValue(e.target.value)}} name={service.[field]}></input>

                    <div className="modal-footer d-flex justify-content-end">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary" >Save changes</button>
                    </div>
                    {msg ? <div className={msg.msg.param}>{msg.msg.text}</div>:<LoadingIndicator/>}
                  </form>
                </div>
              </div>
            </div>
            {/*files*/}
            <div className="modal fade" id="edit-details-file" tabIndex="-1" role="dialog" aria-labelledby="e-mail" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="e-mail">Change {field}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="modal-body" autoComplete="off">
                    <p>New {field}</p>
                    <input type={type} onChange={e => setFile(URL.createObjectURL(e.target.files[0]))} name='image'></input>

                    <div className="modal-footer d-flex justify-content-end">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary" >Save changes</button>
                    </div>
                    {msg ? <div className={msg.msg.param}>{msg.msg.text}</div>:<LoadingIndicator/>}
                  </form>
                </div>
              </div>
            </div>
        </div>
        </div>
          :
        <LoadingIndicator/>
      }
      {msg ? <div className={msg.msg.param}>{msg.msg.text}</div>:<p></p>}
    </div>

  )
}

export default withRouter(EditStoreDetails);
