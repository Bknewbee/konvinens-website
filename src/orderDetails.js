import React, {useState,useEffect} from "react";
import axios from "axios";
import {trackPromise} from 'react-promise-tracker';
import {withRouter} from 'react-router-dom';
import {Paper,Grid} from "@mui/material"

import GetOrderItems from "./getOrderItems"

function OrderDetails(props) {

  const [order,setOrder] = useState(null);
  const [ids,setIds] = useState(null);

  const getOrder = async () =>{
    let config = {
      withCredentials: true
    }

    console.log(ids);
    await trackPromise(
      axios.post(`https://konvinens.herokuapp.com/api/get-order`, {id: props.match.params.id} ,config)
        .then((res)=>{
          console.log(res.data)

          let tmpIds = [];
          res.data.order.items.forEach((item, i) => {
            tmpIds.push(item.itemId);
          });
          setIds(tmpIds);
          setOrder(res.data.order);
        })
        .catch((err)=>console.log(err))
    )
  }

  useEffect(() => {
    getOrder()
  }, []);

  return(
    <Paper sx={{margin:2,padding: 2}}>
      {
        order?
        <Grid container align="left">
          <Grid item xs={12} align="right" sx={{py:1}}>
            <p>order numder : {order.number}</p>
          </Grid>
          <Grid item xs={12}>
            <Grid container align="center">
              <Grid item xs={12} sx={{borderBottom:"1px solid #bfbfbf"}}>
                <p>Items</p>
              </Grid>
              <Grid item xs={12}>
                <GetOrderItems ids={ids?ids:null} items={order.items}/>
              </Grid>

            </Grid>
          </Grid>
          <Grid item xs={8} sx={{py:2}}>
            <p>Total</p>
          </Grid>
          <Grid item xs={4} sx={{py:2}}>
            <p>P{order.total}</p>
          </Grid>
        </Grid>
        :
        <p></p>
      }
    </Paper>
  )
}

export default withRouter(OrderDetails);
