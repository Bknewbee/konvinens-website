import React, {useState,useEffect} from "react";
import axios from "axios";
import {trackPromise} from 'react-promise-tracker';
import {Grid} from "@mui/material";

function GetOrderItems (props){

  const [items,setItems] = useState(null)
  const [stores, setStores] = useState(null)

  const getItems = async () =>{
    let config = {
      withCredentials: true
    }

    await trackPromise(
      axios.post(`https://konvinens.herokuapp.com/api/get-items`, props.ids ,config)
        .then((res)=>{

          console.log(res.data)
          setItems(res.data.products);
          setStores(res.data.storeDetails);

        })
        .catch((err)=>console.log(err))
    )
  }

  useEffect(() => {
    getItems()
  }, []);
  return(
    <div>
      {
        stores?
          stores.map((store,i)=>(
            <Grid container key={i} sx={{borderBottom: "1px solid #bfbfbf",py:2}}>
              <Grid item xs={12} align="left">
                <p>Store :{store.name}</p>
              </Grid>
              <Grid item xs={12}>
                {
                  items?
                  items.map((item,i)=>(
                        item.owner === store.name?
                        <Grid container key={i} >
                          <Grid item xs={4}>
                            <p>Title :{item.title}</p>
                          </Grid>
                          <Grid item xs={4}>
                            {
                              props.items.map((propItem, i)=>(
                                propItem.itemId === item._id?
                                <p key={i}>Qty: {propItem.purchaseQty}</p>
                                :
                                <p></p>
                              ))
                            }
                          </Grid>
                          <Grid item xs={4}>
                            <p>P{item.price}</p>
                          </Grid>
                      </Grid>
                        :
                        <p></p>
                  ))
                  :
                  <p></p>
                }
              </Grid>
            </Grid>
          ))
        :
        <p></p>
      }
    </div>
  )
}

export default GetOrderItems;
