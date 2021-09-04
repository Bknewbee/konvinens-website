import React from 'react';
//import products from './productItems';

function Cart (props){


  return(
    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="cartDropdown">
      <li className="dropdown-item" style={{borderBottom: "solid black 1px"}}>Items in Cart</li>
      {
        sessionStorage.cart ?
        sessionStorage.cart.split(',').map((item, i) => (
          /*
          products.map((product,i)=>(
            item === product.id ?
            <li className="dropdown-item" key={i}>{product.name}</li>
            :
            <li key={i}></li>
          ))
          */
          <li className="dropdown-item" key={i}>{item.split('-')[1]}</li>
        ))
        :
        <p></p>
      }
      <li className="dropdown-item" style={{borderBottom: "solid black 1px"}}><a href="/checkout">Proced to checkout</a></li>
    </ul>
  )
}

export default Cart;
