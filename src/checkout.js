import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
          <div key={i} className="row">
            <div className="col-4 text-left px-4">
              {item.title}
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
  return ['Confirm cart items ', 'Confirm adresses','Delevery service', 'Payment','Review Order'];
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
      return three();
    case 4:
      return ReviewOrder();
    default:
      return 'Unknown step';
  }
}

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

  const getItems = () => {
    let config = {
      withCredentials: true
    }
    if(sessionStorage.cart){
      let itemsArray = sessionStorage.cart.split(',');
      itemsArray.pop();
      let findItems = [];

      itemsArray.forEach((item, i) => {
        findItems[i] = item.split('-').[0]

        return findItems
      });


      axios.post(`https://konvinens.herokuapp.com/api/get-items`, findItems, config)
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
    }else{
      setMsg({param: "alert alert-info",text:"There are no items in cart"});
    }

  }

  useEffect(()=>{
    getItems();
  },[])

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
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



function Checkout(){

  return(
    <div id="Checkout" className="">
      {HorizontalLinearStepper()}
    </div>
  )
}

export default Checkout;
