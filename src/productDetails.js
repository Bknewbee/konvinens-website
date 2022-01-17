import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Tooltip,Grid} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {trackPromise} from 'react-promise-tracker';

import LoadingIndicator from './loadingIndicator';
//import products from "./productItems.js";
import Product from './productCard';
import HorizontalProductList from './horizontalProductList';

import "./productDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      productId: "",
      product: null,
      similarProducts: [],
      msg:{},
      purchaseQuantity: 1,
      cart: '',
      similarProducts: []
    };
    this.changeQuantity = this.changeQuantity.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.cart = this.cart.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  increment(){
      if(this.state.purchaseQuantity === this.state.product.qty){
        alert("Only "+this.state.product.stock+" available");
      }else{
        this.setState({purchaseQuantity: this.state.purchaseQuantity + 1})
      }
  }
  decrement(){
    if(this.state.purchaseQuantity <= 1){
      alert("Remove product from cart");
      this.setState({purchaseQuantity: 1})
    }else{
      this.setState({purchaseQuantity: this.state.purchaseQuantity -1});
    }
  }
  addToCart(){
      console.log(this.state.cart);
      if(!this.state.cart.includes(this.state.productId)){
        this.setState({cart: this.state.cart.concat(this.state.productId+"-"+this.state.product.title+"-"+this.state.purchaseQuantity+",")});
        console.log(this.state.cart);
        sessionStorage.setItem('cart', this.state.cart.concat(this.state.productId+"-"+this.state.product.title+"-"+this.state.purchaseQuantity+","));
        alert("added to cart")
      }else{
        alert("product in cart")
      }

  }
  cart(){
    return  <ul className="list-group">
              {
                window.sessionStorage.cart ?
                window.sessionStorage.cart.length > 0 ?
                //console.log(window.sessionStorage.cart.split(',')[0])
                window.sessionStorage.cart.split(',').map((productCart, i)=>(
                  /*
                  products.map((product,i)=>(
                    productCart === product.id ?

                    :
                    null
                  ))
                ))*/
                <li className="list-group-item" key={i}>{productCart.split('-')[1]}</li>
              ))
                :
                <p>No items in cart</p>
                :
                <p>Empty</p>
              }
            </ul>
  }
  changeQuantity(event){
    console.log(event.target.name);
    if(event.target.name === "directEditQuantity"){
      console.log(this.state.product.qty+" / " +event.target.value);
      if(event.target.value > this.state.product.qty){
        alert("Only "+this.state.product.qty+" available");
        this.setState({purchaseQuantity: 1})
      }else if(event.target.value < 0){
        alert("Remove product from cart");
        this.setState({purchaseQuantity: 1});
      }else{
        this.setState({purchaseQuantity: event.target.value});
      }
    }
  }
  async componentDidMount(){
    //console.log(this.props.match.params.productId);
    let config = {
      withCredentials: true
    }

    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/api/product`,{"id": this.props.match.params.productId}, config)
      .then((res)=>{
        console.log(res.data.similarProducts);
        this.setState({product: res.data.product},
          function(){
            this.setState({productId: this.props.match.params.productId});
            this.setState({similarProducts: res.data.similarProducts});
          }
        );

      })
      .catch((err)=>{
        console.error(err);
      })
    )
    if(!sessionStorage.getItem('cart')){
      sessionStorage.setItem('cart', '');
    }
    this.setState({cart: sessionStorage.getItem('cart')},
    function (){
      sessionStorage.setItem('cart', this.state.cart);
    }
    );
    /*
    var joined = this.state.similarProducts;
    this.setState({productId: this.props.match.params.productId});
    const found = products.find(({id}) => id === this.props.match.params.productId)
    if(found){
     this.setState({product: found},
       function(){
         products.forEach((product, i) => {
           this.state.product.category.map((category)=>(
             product.category.includes(category) ?
             product.id === this.state.product.id ?
             console.log(true)
             :
             (
               !joined.includes(product) ?
               joined.push(product)
               :
               true,
               this.setState({similarProducts: joined})
             )
             :
             console.log("")
           ))
         });
       }
      );



    }else{
      this.setState({msg: {text:"Product not found"}})
    }
    */
    //console.log(found);
    /*products.map((product)=>{
      if(product.id === this.props.match.params.productId){
        return this.setState({product: product});
      }else{
        return this.setState({msg: {text:"Product not found"}})
      }
    })*/

  }

  render(){
    return(
      <div id="ProductDetails" className="app-body">
        {
          this.state.product ?
          <div className="row" style={{minHeight: "90vh", margin:"0px"}}>
            <div className="col-md-5 col-sm-12" style={{backgroundColor:"white", padding:"0px",margin:"0px",height:"100%"}}>
              <img src={"data:"+this.state.product.image.contentType+";base64,"+this.state.product.image.imgBuffer} className="img-fluid" alt="product"></img>
            </div>
            <div className="col-md-5 col-sm-8" style={{backgroundColor:"white", textAlign:"left"}}>
              <p>{this.state.msg.text}</p>
              <h2>{this.state.product.title}</h2>
              <p>{this.state.product.description}</p>
              <div><div className="btn">Instock : {this.state.product.qty}</div>{this.state.product.onSale ? <button className="btn btn-success">{this.state.product.promoPrice}% OFF</button>: ""}</div>

              <div className="row">
                <div className="col" style={{fontSize:"1.2em"}}>

                </div>
                <div className="col-6">
                  <div className="input-group mb-3" >
                    <div className="input-group-prepend">
                      <span className="input-group-text" onClick={this.increment}>+</span>
                    </div>
                    <input type="number" className="form-control"  aria-label="Amount (Quantity)" value={this.state.purchaseQuantity} onChange={this.changeQuantity} name="directEditQuantity"/>
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={this.decrement}>-</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-2" align="right" style={{fontSize:"1.5em"}}>
                <div className="col-6 d-flex justify-content-around" align="left">
                  <Tooltip title="Add to cart" placement="top">
                    <div className="hover btn"><AddShoppingCartIcon fontSize="large" onClick={this.addToCart}></AddShoppingCartIcon></div>
                  </Tooltip>
                  <Tooltip  title="Add to wish list" placement="top">
                    <div className="hover"><PlaylistAddIcon  fontSize="large"></PlaylistAddIcon></div>
                  </Tooltip>
                </div>
                <div className="col-6">
                  {
                    this.state.product.onSale ?
                    <p>Total : P{Math.round(this.state.product.price-(this.state.product.price*this.state.product.promoPrice/100)).toFixed(2)}</p>
                    :
                    <p>Total : P{(this.state.purchaseQuantity*this.state.product.price).toFixed(2)}</p>
                  }
                </div>
              </div>
              {/*
              <div style={{border:"solid black 1px", padding:"0px 2px"}}> Categories : {
                  this.state.product.category.length > 0 ?
                  this.state.product.category.map((cat, i)=>(
                    <button key={i} className="btn" style={{padding:"0px",fontSize:".8rem",margin:"0px 1px 0px 1px"}}>{cat}</button>
                  ))
                  :
                  <button>none</button>
                }</div>
                */}
            </div>

            <div className="col-md-2 col-sm-4" style={{backgroundColor:"white"}}>
              <h2>Cart</h2>
              {this.cart()}
            </div>
          </div>
          :
          <div style={{minHeight: "40vh"}}><h2>{this.state.msg.text}</h2><LoadingIndicator/></div>
        }
        <hr/>
        <div style={{backgroundColor:"white"}}>
          <h2>Similar Products</h2>
          <br/>
          <HorizontalProductList products={this.state.similarProducts}/>

        </div>

      </div>
    )

  }
}

export default withRouter(ProductDetails);
