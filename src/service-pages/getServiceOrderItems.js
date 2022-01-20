import React, {useState,useEffect} from "react";
import axios from "axios";
import {trackPromise} from 'react-promise-tracker';
import {Grid} from "@mui/material";

function GetServiceOrderItems (props){

  const [items,setItems] = useState(null)

  const getItems = async () =>{
    let config = {
      withCredentials: true
    }

    await trackPromise(
      axios.post(`https://konvinens.herokuapp.com/api/get-items`, props.ids ,config)
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
      <p>Service Order Items</p>
        {
          items?
          items.map((item,i)=>(
                <Grid container key={i} >
                  <Grid item xs={6} align="left">
                    <p>Title :{item.title}</p>
                  </Grid>
                  <Grid item xs={3}>
                    {
                      props.items.map((propItem, i)=>(
                        propItem.itemId === item._id?
                        <p key={i}>Qty: {propItem.purchaseQty}</p>
                        :
                        <p></p>
                      ))
                    }
                  </Grid>
                  <Grid item xs={3}>
                    <p>P{item.price}</p>
                  </Grid>
              </Grid>
          ))
          :
          <p></p>
        }
    </div>
  )
}

export default GetServiceOrderItems;
