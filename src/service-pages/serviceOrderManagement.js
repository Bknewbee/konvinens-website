import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';


import OrderTable from '../orderTable';

function ServiceOrderManagement(){

  const [orders, setOrders] = useState(null);

  const getOrders = async () =>{
    let config = {
      withCredentials: true
    }

    await trackPromise(
      axios.get(`/api/get-service-orders`, config)
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

export default ServiceOrderManagement;
