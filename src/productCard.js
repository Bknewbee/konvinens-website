import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import {Card,CardActionArea,CardContent,CardMedia,Typography,Tooltip} from '@material-ui/core';



import './productCard.css';
/*
const useStyles = makeStyles({
  root:{
    transition: "transform 0.15s ease-in-out"
  },
  media:{
    height: 150,
  }
})
/*
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    sessionStorage.getItem(localStorageKey) || ''
  );
  useEffect(()=>{
    sessionStorage.setItem(localStorageKey, value);
  },[value,localStorageKey]);
  return [value, setValue];
};
*/



const Product = (props, add) => {
  //const classes = useStyles();
/*
  const [cart, setCart] = useStateWithLocalStorage(
    'cart'
  );
*/

/*

  const addToCart = () => {

      if(cart.includes(props.id)){
        alert("Product is already in cart")
        //alert("Added to cart");
      }else(
        //alert("Product is already in cart")
        setCart(cart.concat(props.id+"-"+props.name+","))
      )
  }
  useEffect(()=>{
    sessionStorage.setItem('cart', cart.concat(props.id+"-"+props.name+","))
  })
*/
  var shortDes = props.description.substring(0,70) + "..." ;
  return (
      /*
      <Card
        className={classes.root}
        id="Product"
        >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.img}
            title={props.name}
            >
          </CardMedia>
          <CardContent align="left">
            <Typography component="p" align="left">
              <small>Sold by: </small>{props.owner}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Typography  component="p" align="left">
            <a href={"/product/"+props.id}>{props.name}</a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left" gutterBottom className="description">
            {
              props.description.length > 70 ?
              shortDes :
              props.description
            }

          </Typography>
          <hr/>
          <Typography component="div" className="row">
            {
              props.onSale ?
              <div className="col-12" align="left">
                <div className="col">
                <Tooltip title="Was" placement="top" style={{color: "red", textDecoration:"line-through"}}>
                  <div>P{props.price}</div>
                </Tooltip>
                </div>
                <div className="col">
                  <Tooltip title="Now" placement="bottom">
                    <div style={{color: "green",textDecoration:"underline"}}>
                      P{Math.round(props.price-(props.price*props.promoPrice/100)).toFixed(2)}
                    </div>
                  </Tooltip>
                </div>
              </div>
              :
              <div className="col-6 Price">
                P{props.price}
              </div>
            }
          </Typography>
        </CardContent>
      </Card>
      */
      <div id="Product" className="card border-dark card-block card-1 text-left">
        <div className="card-header">
          <img className="card-img-top" src={props.img} alt="Card cap"/>
        </div>
        <div className="card-body">
          <p><small>Sold by: </small>{props.owner}</p>
          <a href={"/product/"+props.id}><h5 className="card-title"> {props.name}</h5></a>
          <p className="card-text">
            {
              props.description.length > 70 ?
              shortDes :
              props.description
            }
          </p>
        </div>
        <div className="card-footer text-right ">
          <p>P {props.price}</p>
        </div>
      </div>
  )
}

export default Product;
