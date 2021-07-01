import React from 'react';
import products from './productItems';

function Cart (props){

  return(
    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="cartDropdown">
      <li className="dropdown-item" style={{borderBottom: "solid black 1px"}}>Items in Cart</li>
      {
        props.cart.split('').map((item, i) => (
          products.map((product,i)=>(
            item === product.id ?
            <li className="dropdown-item" key={i}>{product.name}</li>
            :
            <li key={i}></li>
          ))
        ))
      }
    </ul>
  )
}

export default Cart;
