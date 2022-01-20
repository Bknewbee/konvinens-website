import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';
import {withRouter} from 'react-router-dom';


import OrderTable from '../orderTable';

function ServiceOrderManagement(props){

  const [orders, setOrders] = useState(null);

  const getOrders = async () =>{
    let config = {
      withCredentials: true
    }

    await trackPromise(
      axios.post(`https://konvinens.herokuapp.com/api/get-service-orders`, {storeName: props.match.params.storeName},config)
        .then((res)=>{
          console.log(res.data)
          setOrders(res.data.orders);
        })
        .catch((err)=>console.log(err))
    )
  }

  useEffect(() => {
    getOrders()
  }, []);

  return(
    <div>
      <OrderTable orders={orders?orders:null}/>
    </div>
  )
}

export default withRouter(ServiceOrderManagement);
