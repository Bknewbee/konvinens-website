import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';

import Product from "./productCard.js";
import LoadingIndicator from './loadingIndicator';
import './getProducts.css';


function GetProducts(props){

  const [products, setProducts] = useState(null);

  useEffect(()=>{
    if(!products){
      getThem();
    }
  })

  const getThem = async () => {
    let config = {
      withCredentials: true
    }

    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/products`,{filter: props.filter}, config)
      .then((res)=>{
        console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err)=>{
        console.error(err);
      })
    )
  }
  return(
    <div id="Product" className="">
      <h1>List of {props.filter}</h1>
      <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {
          !products ?
          <LoadingIndicator/>
          :
          products.map((product,i)=>(
            <div key={i} className="col-sm-auto ">
              <Product id={product._id} img={"data:"+product.image.contentType+";base64,"+product.image.imgBuffer} name={product.title} owner={product.owner} description={product.description} price={product.price} promoPrice={product.promoPrice} onSale={product.onSale}/>
            </div>
          ))
        }

      </div>
    </div>
  )
  /*
  return (
    <div class="container-fluid">
    <h1 class="mt-5">Bootstrap 4 Horizontal Scrolling</h1>
		<p class="subtitle">Horizontal scrolling without CSS. Just copy scrolling wrapper classes</p>
    <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">

			<div class="col-5">
				<div class="card card-block card-1"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-2"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-3"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-4"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-5"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-6"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-7"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-8"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-9"></div>
			</div>
			<div class="col-5">
				<div class="card card-block card-10"></div>
			</div>
    </div>
</div>

  )
  */
}

export default GetProducts;
