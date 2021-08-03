import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

//set loading information
import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

import './storePage.css';

function StorePage (props){
  const [store, setStore] = useState(null);
  const [msgs, setMsgs] = useState(null);

  useEffect(()=>{
    let name = props.match.params.storeName;
    getServices(name);
  },[props.match.params.storeName])

  const getServices = async(name) => {
    let config = {
      withCredentials: true
    }
    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/get-store`,{name: name}, config)
      .then((res)=> {
        console.log(res.data);
        if(res.data.user){
          setStore(res.data.store);
        }else {
          setMsgs(res.data.msg)/*
          setTimeout(function () {
             // after 2 seconds
             window.location = '/log-in';
          }, 2000)*/
        }
      })
      .catch((err)=> console.error(err))
    )
  }

  return(
      <div id="StorePage" align="left">
        {
          store ?
          <div>
            <h1>{store.name}</h1>
            <hr/>
            <a href={"/store-service/"+store.name+"/edit-service-details"}>Edit Store Details</a> <br/>
            <a href={"/store-service/"+store.name+"/product-management"}>Manage store products</a>
          </div>
          :
          <div>
            {
              msgs ?
              <div>msg in store page</div>
              :
              <LoadingIndicator/>
            }
          </div>
        }
      </div>
  )
}

export default withRouter(StorePage);
