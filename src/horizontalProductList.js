import React from 'react';
import Product from "./productCard.js";
import LoadingIndicator from './loadingIndicator';

import './horizontalProductList.css';

function HorizontalProductList (props) {
  return(
    <div id="HorizontalProductList">
      <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        {
          !props.products ?
          <LoadingIndicator/>
          :
          props.products.map((product,i)=>(
            <div key={i} className="col-sm-auto ">
              <Product id={product._id} img={"data:"+product.image.contentType+";base64,"+product.image.imgBuffer} name={product.title} owner={product.owner} description={product.description} price={product.price} promoPrice={product.promoPrice} onSale={product.onSale}/>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default HorizontalProductList
