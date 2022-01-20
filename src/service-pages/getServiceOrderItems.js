import React, {useState,useEffect} from "react";
import axios from "axios";
import {trackPromise} from 'react-promise-tracker';
import {Grid} from "@mui/material";

function GetOrderItems (props){

  const [items,setItems] = useState(null)

  const getItems = async () =>{
    let config = {
      withCredentials: true
    }

    await trackPromise(
      axios.post(`/api/get-items`, props.ids ,config)
        .then((res)=>{

          console.log(res.data)
          setItems(res.data.products);

        })
        .catch((err)=>console.log(err))
    )
  }

  useEffect(() => {
    getItems()
  }, []);
  return(
    <div>
      <p>Service Order Items<p/>
    </div>
  )
}

export default GetOrderItems;
