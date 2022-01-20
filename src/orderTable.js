import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead,TableRow,Paper} from "@mui/material";


export default function OrderTable(props){

  return(
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="order table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Number of Items</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.orders?
            props.orders.map((order, i)=>(
              <TableRow key={i}
                sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>no.</TableCell>
                <TableCell component="th" scope="row"><a href={"/order-details/"+order.owner+"/"+order._id}>{order.number}</a></TableCell>
                <TableCell>...</TableCell>
                <TableCell align="right">{order.items.length}</TableCell>
                <TableCell align="right">P{order.total}</TableCell>
              </TableRow>
              ))
            :
            <TableRow></TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
