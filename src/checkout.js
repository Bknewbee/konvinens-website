/*
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';




import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import LoadingIndicator from './loadingIndicator';
import './checkout.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function one (items,msg) {
  let sum = 0;
  let totalProducts = 0;

  return (
    /*
    <div id="Cart">
      <h1>Shopping Cart</h1>
      <div className="row py-4">
        <div className="col-4">
          Title
        </div>
        <div className="col-4">
          Description
        </div>
        <div className="col-2">
          Qty
        </div>
        <div className="col-2">
          Price
        </div>
      </div>
      {
        items ?
        items.map((item, i)=>(
          <div key={i} className="row item">
            <div className="col-4 text-left px-4">
              <figure className="figure">
                <img src={"data:"+item.image.contentType+";base64,"+item.image.imgBuffer} className="figure-img img-fluid" alt={item.title}></img>
                <figcaption className="figure-caption text-center">{item.title}</figcaption>
              </figure>
            </div>
            <div className="col-4 text-left">
              {item.description}
            </div>
            <div className="col-2">
              {item.purchaseQty}
            </div>
            <div className="col-2">
              P {(item.price*parseInt(item.purchaseQty)).toFixed(2)}
            </div>
          </div>
        ))
        :
        msg ?
        <div className={msg.param}>{msg.text}</div>
        :
        <p>Loading</p>
      }
      {
        items ?
          (items.map((item, i) => (
            (sum += item.price,
            totalProducts += parseInt(item.purchaseQty))
          )),
          <div className="row py-4">
            <div className="col-8">Total</div>
            <div className="col-2">{totalProducts}</div>
            <div className="col-2">P {(sum*totalProducts).toFixed(2)}</div>
          </div>
        )
        :
        <p></p>
      }
    </div>

    *
    <div id="Cart">
      <table className="table table-striped table-bordered table-hover table-sm">
        <thead className="thead-light">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
          </tr>
        </thead>

        <tbody>

          {
            items ?
            items.map((item, i)=>(

              <tr key={i}>
                <th style={{minWidth: "10px",maxWidth:"60px"}} scope="row">
                  <figure className="figure">
                    <img src={"data:"+item.image.contentType+";base64,"+item.image.imgBuffer} className="figure-img img-fluid" alt={item.title}></img>
                    <figcaption className="figure-caption text-center">{item.title}</figcaption>
                  </figure>
                </th>
                <td className="text-left" >{item.description}</td>
                <td style={{minWidth: "10px",maxWidth:"20px"}}>{item.purchaseQty}</td>
                <td style={{minWidth: "10px",maxWidth:"20px"}}>P {(item.price*parseInt(item.purchaseQty)).toFixed(2)}</td>
              </tr>
            ))
            :
            msg ?
            <div className={msg.param}>{msg.text}</div>
            :
            <tr><th colSpan="4" className="table-info" scope="row"><LoadingIndicator/></th></tr>
          }
          {
            items ?
              (items.map((item, i) => (
                (sum += item.price,
                totalProducts += parseInt(item.purchaseQty))
              )),
              <tr className="">
                <th colSpan="2" className="table-primary">Total</th>
                <td className="table-primary">{totalProducts}</td>
                <td className="table-primary">P {(sum*totalProducts).toFixed(2)}</td>
              </tr>
            )
            :
            <tr></tr>
          }

        </tbody>
      </table>
    </div>
  )
}
function two () {
  return (
    <div>
      <h1>Adressess</h1>
      <form autoComplete="off">
        <h2>Enter delivery details</h2>
        <div className="form-group">
          <TextField required variant="outlined" size="small" label="Address line 1"/>
        </div>
        <div className="form-group">
          <TextField variant="outlined" size="small" label="Address line 2"/>
        </div>
        <div className="form-group">
          <TextField required variant="outlined" size="small" label="District"/>
        </div>
        <div className="form-group">
          <TextField required variant="outlined" size="small" label="City / Village / Town"/>
        </div>
      </form>
    </div>
  )
}
function three () {
  return (
    <div>
      <h1>Payment Method</h1>
      <p>Payment method details</p>
    </div>
  )
}
function ChooseDelivery () {
  return (
    <div>
      <h1>Select delevery service</h1>
      <p>Delivery details</p>
    </div>
  )
}
function ReviewOrder () {
  return (
    <div>
      <h1>Review Order</h1>
      <p>Order details</p>
    </div>
  )
}

function getSteps() {
  return ['Confirm cart items ', 'Confirm adresses','Delevery service', 'Review Order ','Payment'];
  //return [one(),two(),three()]
}

function getStepContent(step, items, msg) {
  switch (step) {
    case 0:
      return one(items,msg);
    case 1:
      return two();
    case 2:
      return ChooseDelivery();
    case 3:
      return ReviewOrder();
    case 4:
      return three();
    default:
      return 'Unknown step';
  }
}

/*
function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  //Set optional step by returning its index
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const checkWidth = () => {
        var windowsize = window.innerWidth;
        if (windowsize > 768) {
            //if the window is greater than 440px wide then turn on jScrollPane..
            console.log(windowsize);
        }
    }




  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [items, setItems] = useState(null);
  const [msg, setMsg] = useState(null);

  const getItems = async() => {
    let config = {
      withCredentials: true
    }
    if(sessionStorage.cart){
      let itemsArray = sessionStorage.cart.split(',');
      itemsArray.pop();
      let findItems = [];

      itemsArray.forEach((item, i) => {
        findItems[i] = item.split('-')[0]
        return findItems
      });


      await trackPromise(axios.post(`/api/get-items`, findItems, config)
        .then((res)=> {
          //console.log(res.data.user);
          res.data.products.map((item)=>{
            itemsArray.map((itema)=>{
              if(itema.split('-')[0] === item._id){
                item["purchaseQty"] = itema.split("-")[2];
              }
              return true
            })
            return true
          })
          setItems(res.data.products)
        })
        .catch((err)=> console.log(err))
      )
    }else{
      setMsg({param: "alert alert-info",text:"There are no items in cart"});
    }

  }
  useEffect(()=>{
    checkWidth();
    getItems();
  })


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation={(window.innerWidth < 768) ? "vertical" : "horizontal" }>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              <StepContent>Hello Content step</StepContent>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep,items,msg)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
*/

import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


import Alert from '@mui/material/Alert';

//Files
import './checkout.css';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [items, setItems] = React.useState();
  const [msg, setMsg] = React.useState(null);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  //Shipping variables
  const [addressLine, setAddressline] = useState("");
  const [secondAddressLine, setSecondAddressline] = useState("");
  const [settlement, setSettlement] = useState("");
  //Card variables
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("")

  const [refresh, setRefresh] = useState(false);
  //steps functions

  function EditCart (msg,checkWidth) {
    let sum = 0;
    let totalProducts = 0;

    const increment = (val) => {
      let cartItems = sessionStorage.getItem('cart').split(',');

      let cartItem = sessionStorage.getItem('cart').split(',')[val].split("-")

      const index = cartItems.indexOf(cartItems[val]);
      if(index > -1){
        cartItems.splice(index, 1);
      }

      let x = parseInt(items[val].purchaseQty);

      if(x===items[val].qty){
        console.log("There are only "+items[val].qty+" available");
        return;
      }else{
        cartItem[2] = x+=1;
        cartItems.splice(val, 0, cartItem.join("-"));

        sessionStorage.setItem('cart', cartItems.join(","))
      }

      let y = parseInt(items[val].purchaseQty);

      if(y===items[val].qty){
        console.log("There are only "+items[val].qty+" available");
        return
      }else{
        y+=1;
        let newItems = items;
        newItems[val].purchaseQty = y;

        setItems(newItems);
        setRefresh(!refresh);
      }


      //console.log(items[val]);
    }
    const decrement = (val) => {

      let cartItems = sessionStorage.getItem('cart').split(',');

      let cartItem = sessionStorage.getItem('cart').split(',')[val].split("-")

      const index = cartItems.indexOf(cartItems[val]);
      if(index > -1){
        cartItems.splice(index, 1);
      }

      let x = parseInt(items[val].purchaseQty);

      if(x<=1){
        console.log("click the remove button to remove product from cart");
        return
      }else{
        cartItem[2] = x-=1;
        cartItems.splice(val, 0, cartItem.join("-"));
        sessionStorage.setItem('cart', cartItems.join(","))
      }

      let y = parseInt(items[val].purchaseQty);

      if(y<=1){
        console.log("click the remove button to remove product from cart");
      }else{
        y-=1;
        let newItems = items;
        newItems[val].purchaseQty = y;
        setItems(newItems);
        setRefresh(!refresh);
      }

      //console.log(items[val]);
    }

    return (
      checkWidth ?
      <Box sx={{my:2}} >
        <h1>Shopping Cart</h1>
        <Grid container sx={{my: 2,pb:2,borderBottom:"solid black 1px"}}>
          <Grid item xs={6}>
            Title
          </Grid>
          <Grid item xs={3}>
            Price
          </Grid>
          <Grid item xs={3} style={{backgroundColor:"#e3e3e3"}}>
            Total
          </Grid>
        </Grid>
        {
          items ?
          items.map((item, i)=>(
          <Box key={i} sx={{borderBottom:"solid black 1px"}}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Box sx={{p: 0, maxWidth: "160px"}}>
                  <figure className="figure">
                    <img src={"data:"+item.image.contentType+";base64,"+item.image.imgBuffer} className="figure-img img-fluid" alt={item.title}></img>
                    <p>{item.title}</p>
                  </figure>
                </Box>
              </Grid>
              <Grid item xs={3} >
                <Box sx={{mt: 2}}>
                  P {item.price}
                </Box>
              </Grid>
              <Grid align="right" item xs={3} style={{backgroundColor:"#e3e3e3"}}>
                <Box sx={{mt: 2,pr:2}}>
                  P {(item.price*parseInt(item.purchaseQty)).toFixed(2)}
                </Box>
              </Grid>

              <Grid item xs={1}>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{my: 2, px: 2}}>
                  <Grid container>
                    <Grid item xs={4} sx={{backgroundColor: "#e69512"}} onClick={()=>{decrement(i)}}>
                      -
                    </Grid>
                    <Grid item xs={4} sx={{border: "solid 1px black"}}>
                      {item.purchaseQty}
                    </Grid>
                    <Grid item xs={4} sx={{backgroundColor: "#e69512"}} onClick={()=>{increment(i)}}>
                      +
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3} style={{backgroundColor:"#e3e3e3"}}>
              </Grid>
            </Grid>
          </Box>
          ))
          :
          msg ?
          <Alert severity={msg.param}>{msg.text}</Alert>
          :
          <p>Loading</p>
        }
        {
          items ?
            (items.map((item, i) => (
              (sum += item.price,
              totalProducts += parseInt(item.purchaseQty))
            )),
            <Grid container sx={{my: 2}}>
              <Grid align="" item xs={2}>
                Total
              </Grid>
              <Grid align="" item xs={6} style={{backgroundColor:"#e3e3e3"}}>
                {totalProducts}
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid align="right" item xs={3} style={{backgroundColor:"#e3e3e3"}} sx={{pr:2}}>
                P {(sum*totalProducts).toFixed(2)}
              </Grid>
            </Grid>
          )
          :
          <p></p>
        }
      </Box>
      :
      <Box id="Cart" sx={{my:2, border: 1,borderColor: 'text.primary'}}>
      <h1>Shopping Cart</h1>
        <Grid container sx={{my: 2,pb:2,borderBottom:"solid black 1px"}}>
          <Grid item xs={3}>
            Title
          </Grid>
          <Grid item xs={3}>
            Description
          </Grid>
          <Grid item xs={2}style={{backgroundColor:"#e3e3e3"}}>
            Qty
          </Grid>
          <Grid item xs={2}>
            Price
          </Grid>
          <Grid item xs={2} style={{backgroundColor:"#e3e3e3"}}>
            Total
          </Grid>
        </Grid>
        {
          items ?
          /*
          items.map((item, i)=>(
            <div key={i} className="row item">
              <div className="col-4 text-left px-4">
                <figure className="figure">
                  <img src={"data:"+item.image.contentType+";base64,"+item.image.imgBuffer} className="figure-img img-fluid" alt={item.title}></img>
                  <figcaption className="figure-caption text-center">{item.title}</figcaption>
                </figure>
              </div>
              <div className="col-4 text-left">
                {item.description}
              </div>
              <div className="col-2">
                {item.purchaseQty}
              </div>
              <div className="col-2">
                P {(item.price*parseInt(item.purchaseQty)).toFixed(2)}
              </div>
            </div>
          ))*/
          items.map((item, i)=>(
          <Box key={i}>
            <Grid container spacing={0} >
              <Grid item xs={3}>
                <Box sx={{p: 0, maxWidth: "160px"}}>
                  <figure className="figure">
                    <img src={"data:"+item.image.contentType+";base64,"+item.image.imgBuffer} className="figure-img img-fluid" alt={item.title}></img>
                    <p>{item.title}</p>
                  </figure>
                </Box>
              </Grid>
              <Grid align="left" item xs={3}>
                <Box sx={{mt: 2}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {item.description}
                    <p>Instock: {item.qty}</p>
                  </Grid>
                  <Grid item xs={12}>
                    Remove
                  </Grid>
                </Grid>
                </Box>
              </Grid>
              <Grid item xs={2} style={{backgroundColor:"#e3e3e3"}} >
                <Box sx={{mt: 2, px: 2}}>
                  <Grid container>
                    <Grid item xs={4} sx={{backgroundColor: "#e69512"}} onClick={()=>{decrement(i)}}>
                      -
                    </Grid>
                    <Grid item xs={4} sx={{border: "solid 1px black"}}>
                      {item.purchaseQty}
                    </Grid>
                    <Grid item xs={4} sx={{backgroundColor: "#e69512"}} onClick={()=>{increment(i)}}>
                      +
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={2} >
                <Box sx={{mt: 2}}>
                  P {item.price}
                </Box>
              </Grid>
              <Grid align="right" item xs={2} style={{backgroundColor:"#e3e3e3"}}>
                <Box sx={{mt: 2,pr:2}}>
                  P {(item.price*parseInt(item.purchaseQty)).toFixed(2)}
                </Box>
              </Grid>
            </Grid>
          </Box>
          ))
          :
          msg ?
          <Alert severity={msg.param}>{msg.text}</Alert>
          :
          <p>Loading</p>
        }
        {
          items ?
            (items.map((item, i) => (
              (sum += item.price,
              totalProducts += parseInt(item.purchaseQty))
            )),
            <Grid container sx={{my: 2,pt:2,borderTop:1}}>
              <Grid align="" item xs={6}>
                Total
              </Grid>
              <Grid align="" item xs={2} style={{backgroundColor:"#e3e3e3"}}>
                {totalProducts}
              </Grid>
              <Grid xs={2}></Grid>
              <Grid align="right" item xs={2} style={{backgroundColor:"#e3e3e3"}} sx={{pr:2}}>
                P {(sum*totalProducts).toFixed(2)}
              </Grid>
            </Grid>
          )
          :
          <p></p>
        }
      </Box>
    )
  }
  function getSteps() {
    return ['Confirm cart items', 'Confirm adresses','Delevery service', 'Payment','Review Order'];
  }
  function ChooseDelivery (checkWidth) {
    return (
      checkWidth ?
      <Box>
        <h1>Select delevery service</h1>
        <p>Delivery details</p>
      </Box>
      :
      <Box>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
          <h1>Select delevery service</h1>
          <p>Delivery details</p>
          </Grid>
        </Grid>
      </Box>
    )
  }
  const steps = getSteps()/*[
    {
      label: 'Review Cart',
      description: EditCart(),
    },
    {
      label: 'Confirm adresses',
      description: AdressForm(),
    },
    {
      label: 'Delevery service',
      description: ChooseDelivery(),
    },
    {
      label: 'Review Order',
      description: ReviewOrder(),
    },
    {
      label: 'Payment',
      description: Payment(),
    },
  ];*/
  function AdressForm (checkWidth) {
    return (
      checkWidth?
      <Box component="form" autoComplete="off" sx={{my:2}}>
        <p align="left">Shipping address</p>
        <TextField  required variant="standard" size="small" label="Address line 1" margin="dense" fullWidth onChange={e => setAddressline(e.target.value)} value={addressLine}/>
        <TextField variant="standard" size="small" label="Address line 2" margin="dense" fullWidth onChange={e => setSecondAddressline(e.target.value)} value={secondAddressLine}/>
        <TextField required variant="standard" size="small" label="City / Village / Town" margin="dense" fullWidth onChange={e => setSettlement(e.target.value)} value={settlement}/>
        {
          msg?
          <Alert severity={msg.param} sx={{mt:2}}>{msg.text}</Alert>
          :
          <p></p>
        }
      </Box>
      :
      <Box  component="form" autoComplete="off" sx={{my:2}}>
        <Grid container>
          <Grid item xs={6} sx={{height:"350px"}}>
            <img src="https://4.imimg.com/data4/RF/BD/MY-979637/address-verification-service-500x500.png?w=640" className="img-fluid h-75" alt="Location"/>
          </Grid>
          <Grid item  xs={6} sx={{border:1,p:2,height:"350px"}}>
            <p align="left">Shipping address</p>
            <TextField  required variant="standard" size="small" label="Address line 1" margin="dense" fullWidth onChange={e => setAddressline(e.target.value)} value={addressLine}/>
            <TextField variant="standard" size="small" label="Address line 2" margin="dense" fullWidth onChange={e => setSecondAddressline(e.target.value)} value={secondAddressLine}/>
            <TextField required variant="standard" size="small" label="City / Village / Town" margin="dense" fullWidth onChange={e => setSettlement(e.target.value)} value={settlement}/>
            {
              msg?
              <Alert severity={msg.param}>{msg.text}</Alert>
              :
              <p></p>
            }
          </Grid>
        </Grid>

      </Box>
    )
  }
  function Payment (checkWidth) {
    return (
      checkWidth?
      <Box sx={{my:2}}>
        <p align="left">Payment method</p>

        <TextField style={{width:"260px"}} sx={{m:2}} variant="standard"  size="small" label="Name on card" required onChange={e => setCardName(e.target.value)} value={cardName}/>
        <TextField style={{width:"260px"}} sx={{m:2}} variant="standard"  size="small" label="Card number" required onChange={e => setCardNumber(e.target.value)} value={cardNumber}/>
        <TextField style={{width:"260px"}} sx={{m:2}} variant="standard"  size="small" label="Expiry date" required onChange={e => setExpiryDate(e.target.value)} value={expiryDate}/>
        <TextField style={{width:"260px"}} sx={{m:2}} variant="standard"  size="small" label="CVV" required onChange={e => setCvv(e.target.value)} value={cvv}/>
        {
          msg?
          <Alert severity={msg.param} sx={{mt:2, }}>{msg.text}</Alert>
          :
          <p></p>
        }
      </Box>
      :
      <Box sx={{my:2}}>
      <Grid container>
        <Grid item xs={6}>
          <img src="https://burhan.ua/wp-content/uploads/2019/09/Visa-Mastercard-Logo-12-1-1019x596.jpg" className="img-fluid" alt="Visa Card"/>
        </Grid>
        <Grid item xs={6} sx={{border:1,p:2}}>
          <p align="left">Payment method</p>

          <TextField variant="standard" fullWidth size="small" margin="dense" label="Name on card" required onChange={e => setCardName(e.target.value)} value={cardName}/>
          <TextField variant="standard" fullWidth size="small" margin="dense" label="Card number" required onChange={e => setCardNumber(e.target.value)} value={cardNumber}/>
          <TextField variant="standard" fullWidth size="small" margin="dense" label="Expiry date" required onChange={e => setExpiryDate(e.target.value)} value={expiryDate}/>
          <TextField variant="standard" fullWidth size="small" margin="dense" label="CVV" required onChange={e => setCvv(e.target.value)} value={cvv}/>
          {
            msg?
            <Alert severity={msg.param}>{msg.text}</Alert>
            :
            <p></p>
          }
        </Grid>
      </Grid>

      </Box>
    )
  }
  function ReviewOrder () {
    let sum = 0;
    let totalProducts = 0;
    return (
      checkWidth?
      <Box sx={{my:2,border:1,p:2}}>
        <p align="left" className="font-weight-bold">Order summary</p>
        <Grid container sx={{my:2}}>
          {
            items?
            items.map((item, i)=>(
              <Grid container key={i}>
                <Grid align="left" item xs={4}>
                  {item.title}
                </Grid>
                <Grid align="right" item xs={8}>
                  <p>@ P{item.price} x {item.purchaseQty}(qty) = P {(item.price*item.purchaseQty).toFixed(2)}</p>
                </Grid>
              </Grid>
            ))
            :
            <p></p>
          }
          {
            items ?
              (items.map((item, i) => (
                (sum += item.price,
                totalProducts += parseInt(item.purchaseQty))
              )),
              <Grid container sx={{mt: 2,borderTop:1,pt:2}}>
                <Grid align="" item xs={8}>
                  Total
                </Grid>
                <Grid align="right" item xs={4}>
                  P {(sum*totalProducts).toFixed(2)}
                </Grid>
              </Grid>
            )
            :
            <p></p>
          }
        </Grid>
        <Grid align="left" container spacing={2} sx={{my:2}}>
          <Grid item xs={6}>
            <p className="font-weight-bold">Shipping</p>
            <p>{addressLine}</p>
            <p>{secondAddressLine}</p>
            <p>{settlement}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="font-weight-bold">Payment Details</p>
            <p>{cardName}</p>
            <p>{cardNumber}</p>
            <p>{expiryDate}</p>
          </Grid>
        </Grid>
      </Box>
      :
      <Box sx={{my:2}}>
        <p align="left" className="font-weight-bold">Order summary</p>
        <Grid container sx={{my:2,backgroundColor:"green"}}>
          {
            items?
            items.map((item, i)=>(
              <Grid container key={i}>
                <Grid align="left" item xs={8}>
                  {item.title}
                </Grid>
                <Grid align="right" item xs={4}>
                  <p>@ : P{item.price} x {item.purchaseQty}(qty) = P {item.price*item.purchaseQty}</p>
                </Grid>
              </Grid>
            ))
            :
            <p></p>
          }
          {
            items ?
              (items.map((item, i) => (
                (sum += item.price,
                totalProducts += parseInt(item.purchaseQty))
              )),
              <Grid container sx={{my: 2,borderTop:1}}>
                <Grid align="" item xs={8}>
                  Total
                </Grid>
                <Grid align="right" item xs={4}>
                  P {(sum*totalProducts).toFixed(2)}
                </Grid>
              </Grid>
            )
            :
            <p></p>
          }
        </Grid>
        <Grid align="left" container spacing={2} sx={{my:2}}>
          <Grid item xs={6}>
            <p className="font-weight-bold">Shipping</p>
            <p>{addressLine}</p>
            <p>{secondAddressLine}</p>
            <p>{settlement}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="font-weight-bold">Payment Details</p>
            <p>{cardName}</p>
            <p>{cardNumber}</p>
            <p>{expiryDate}</p>
          </Grid>
        </Grid>
      </Box>
    )
  }
  function getStepContent(step, items, msg,checkWidth) {
    switch (step) {
      case 0:
        return EditCart(msg,checkWidth);
      case 1:
        return AdressForm(checkWidth);
      case 2:
        return ChooseDelivery(checkWidth);
      case 3:
        return Payment(checkWidth);
      case 4:
        return ReviewOrder();
      default:
        return 'Unknown step';
    }
  }

  const checkWidth = () => {
      if (windowDimensions.width < 524) {
          return true
      }else{
        return false
      }
  }

  //check if step is optional
  const isStepOptional = (step) => {
    return false;
  };
  const validate = (activeStep) => {
    console.log("validate :"+activeStep);
    let valid = true;

    if(activeStep === 1){
      if(addressLine.length<=0){
        valid = false
      }
      if(secondAddressLine.length<=0){
        valid = false
      }
      if(settlement.length<=0){
        valid = false
      }
    }else if (activeStep === 3) {
      if(cardName.length<=0){
        valid = false
      }
      if(cardNumber.length<=0){
        valid = false
      }
      if(expiryDate.length<=0){
        valid = false
      }
      if(cvv.length<=0){
        valid= false
      }
    }
    return valid;
  }

  //check if step is skipped
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  //handle going to the next step
  const handleNext = (reqValidation) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(reqValidation){
      let validated = validate(activeStep);
      console.log(validated);
      if(validated){
        setMsg(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }else{
        //set errors
        setMsg({param: "warning",text:"Cant leave fields empty."});
      }
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    if(activeStep=== steps.length - 1){
      handleSubmit()
    }
  };

  //handle going back
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //handle skipping steps
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  /*/handle reseting everything
  const handleReset = () => {
    setActiveStep(0);
  };
*/
  const getItems = async() => {
    let config = {
      withCredentials: true
    }
    if(sessionStorage.cart){
      let itemsArray = sessionStorage.cart.split(',');
      itemsArray.pop();
      let findItems = [];

      itemsArray.forEach((item, i) => {
        findItems[i] = item.split('-')[0]
        return findItems
      });

      console.log(findItems);

      await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/get-items`, findItems, config)
        .then((res)=> {
          res.data.products.map((item)=>{
            itemsArray.map((itema)=>{
              if(itema.split('-')[0] === item._id){
                item["purchaseQty"] = itema.split("-")[2];
              }
              return true
            })
            return true
          })

          let result = [];
          findItems.forEach(function(key){
            var found = false;
            let products = res.data.products.filter(function(product){
              if(product._id === key){
                result.push(product);
                found = true;
                return false;
              }else{
                return true;
              }
            })
          })
          setItems(result)
        })
        .catch((err)=> console.log(err))
      )
    }else{
      setMsg({param: "warning",text:"There are no items in cart"});
    }
  }

  const handleSubmit = () => {

    console.log("submit");
    //send data

  }


  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    getItems()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

      checkWidth() ?
      <Box sx={{ maxWidth: "90%" }} >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                {step}
              </StepLabel>
              <StepContent>
                <div>{getStepContent(index,items,msg,checkWidth)}</div>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={()=>{(activeStep === 1 || activeStep === 3) ? handleNext(true) : handleNext(false) }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Confirm' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
            All steps completed - you&apos;re finished<br/>
            Email of your reciept will be sent to you
            </Typography>

            <a href="/" >Home</a>
          </Paper>
        )}
      </Box>
      :
      <Box sx={{ width: '90%' }} style={{margin: "0 auto"}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished<br/>
              Email of your reciept will be sent to you
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <a href="/" >Home</a>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {
                getStepContent(activeStep,items,msg)
              }
              </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={()=>{(activeStep === 1 || activeStep === 3) ? handleNext(true) : handleNext(false) }}>
                {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

  );
}

function Checkout(){

  return(
    <Box id="Checkout" className="" sx={{pb:5}}>
      {HorizontalNonLinearStepper()}
    </Box>
  )
}

export default Checkout;
