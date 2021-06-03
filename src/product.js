import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardContent,CardMedia,Typography,Tooltip} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';


import './product.css';

const useStyles = makeStyles({
  root:{
  },
  media:{
    height: 140,
  },
})

export default function Product (props) {
  const classes = useStyles();
  var shortDes = props.description.substring(0,80) + "..." ;

  return (
      <Card className={classes.root} variant="outlined" id="Product">
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
          <Typography variant="body2" color="textSecondary" component="p" align="left" gutterBottom className="description">
            {
              props.description.length > 80 ?
              shortDes :
              props.description
            }
          </Typography>
          <hr/>
          <Typography component="div" className="row">
            <div className="col-3">
              <Tooltip title="Add to cart" placement="top">
                <AddShoppingCartIcon></AddShoppingCartIcon>
              </Tooltip>
            </div>
            <div className="col-3">
              <Tooltip title="Add to wish list" placement="top">
                <PlaylistAddIcon></PlaylistAddIcon>
              </Tooltip>
            </div>
            {
              props.onSale ?
              <div className="col-6">
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
  )
}
