import React,{useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField} from '@material-ui/core';
//set loading information
import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

import './productManagement.css';

//Tabs Creation material ui
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minHeight: '100vh'
  },
  table: {
    minWidth: 650,
  },
}));

/*/Create Table
function createData(name, description, price, category, qty) {
  return {name, description, price, category, qty};
}
*/
//const rows = [createData(product.name, product.description, product.price, product.category, product.qty)];

function ProductManagement (props){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [msgs, setMsgs] = React.useState(null);
  const [img, setImg] = React.useState(null);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("owner", props.match.params.storeName)

    let config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    //console.log(formData.entries());
    let newProduct = {}
    for (var pair of formData.entries()) {
      //console.log(pair[0]+ ', ' + pair[1]);
      newProduct[pair[0]] = pair[1];
    }
    //console.log(newProduct);

    if(parseFloat(newProduct.price)){
      newProduct.price = parseFloat(newProduct.price).toFixed(2);
      newProduct.img = img;
      //setProducts(products.concat(newProduct));

      //setMsgs(null);
      //document.getElementById("product-form").reset();
      //setImg(null);
      await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/product-add`, formData,config)
        .then((res)=>{
          //console.log(res.data);
          setMsgs({msg:res.data.msg});
          setTimeout(function () {
             // after 2 seconds
             window.location = res.data.redirect;
          }, 2000)
        })
        .catch((err)=>{
          console.error(err);
        })
      )
    }else{
      setMsgs(
        {msg: {
          param: 'alert alert-danger',
           text:'Make sure product price is a number'
         }
       })
    }

    //console.log(document.getElementById("add-product").modal("hide"));
  }

  const saveProducts = async(event) =>{
    event.preventDefault();
    //console.log(products);

    const formData = new FormData(event.target);

    let config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    //console.log(event.target);

    //console.log(product);
    await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/product-add`, formData,config)
      .then((res)=>{
        console.log(res.data);
        setMsgs({msg:res.data.msg});
      })
      .catch((err)=>{
        console.error(err);
      })
    )
  }

  useEffect(()=>{
    const getProducts = async() => {
      let config = {
        withCredentials: true
      }
      //setUser({name: "Ben", email:"@asdfasdsdf", phoneNumber: "75214847", serviceProvider: false, confirmation: false})
      await trackPromise(axios.post(`https://konvinens.herokuapp.com/api/get-products`,{storeName:props.match.params.storeName}, config)
        .then((res)=> {
          if(res.data.user){
            if(res.data.products.length === 0){
              setMsgs({msg:{param:"alert alert-info",text:"No products"}});
              setTimeout(function () {
                 // after 2 seconds
                 setMsgs(null);
              }, 2000)
            }else{
              setProducts(res.data.products);
            }

          }else {
            setMsgs({msg:res.data.msg})
            setTimeout(function () {
               // after 2 seconds
               window.location = '/log-in';
            }, 2000)
          }
        })
        .catch((err)=> console.log(err))
      )
    }
    getProducts();
  },[props.match.params.storeName])


  return (
    <div className={classes.root}>
      <a href="/your-account" align="left">go to your account</a><br/>
      <a href={"/store-service/"+props.match.params.storeName}>Go back to store management</a>
      <br/>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="View Products" {...a11yProps(0)} />
          <Tab label="Add Products" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        List of Products
        {
          products.length > 0 ?
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="left">No.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                  products.map((product,i) => (
                      //console.log(products),
                    <TableRow key={i}>
                      <TableCell>{i+1}</TableCell>
                      <TableCell component="th" scope="row">
                        {product.title}
                      </TableCell>
                      <TableCell>img</TableCell>
                      <TableCell align="left">{product.description}</TableCell>
                      <TableCell align="right">{product.category}</TableCell>
                      <TableCell align="right">{product.qty}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
          :
          <p></p>
        }
        {msgs ? <div className={msgs.msg.param}>{msgs.msg.text}</div>: <LoadingIndicator/>}
      </TabPanel>
      <TabPanel value={value} index={1} component="div">
        <button data-toggle="modal" data-target="#add-product">Add New Product</button>
        <form  onSubmit={saveProducts}>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>X</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                products.length < 0 ?
                    products.map((product,i) => (
                      //console.log(products),
                    <TableRow key={i}>
                      <TableCell>{i+1}</TableCell>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell><TextField value={product.img} name="img"></TextField></TableCell>
                      <TableCell align="left"><TextField value={product.description} name="description"></TextField></TableCell>
                      <TableCell align="right">{product.category}</TableCell>
                      <TableCell align="right">{product.qty}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell><button onClick={()=>{console.log(i)}}>X</button></TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow></TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <button type="submit">Save Product list</button>
        </form>
        {msgs ? <div className={msgs.msg.param}>{msgs.msg.text}</div>: <p></p>}
      </TabPanel>

      {/*Add new product modal*/}
      <div className="modal fade" id="add-product" tabIndex="-1" role="dialog" aria-labelledby="product-details" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="e-mail">Add Product</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="product-form" className="modal-body" onSubmit={handleSubmit} autoComplete="off">
              <p>Product Details</p>
              <TextField required type="file" name='img' onChange={e => {e.target.files[0] ? setImg(URL.createObjectURL(e.target.files[0])) : setImg(null)}}/> <br/>
              <img src={img} className="img-fluid imgPreview" alt="Product"></img>
              <br/>
              <TextField required fullWidth size="small" variant="outlined" type="text" className="m-1" label="Enter Product Title" name="title"></TextField>
              <TextField required fullWidth multiline variant="outlined" type="text" className="m-1" label="Enter Product Description" name="description"></TextField>
              <TextField required fullWidth multiline variant="outlined" type="text" className="m-1" label="Enter Product Caterories" name="category"></TextField>
              <TextField required fullWidth multiline variant="outlined" type="text" className="m-1" label="Enter Product Tags with , inbetween" name="tags"></TextField>
              <TextField required fullWidth size="small" variant="outlined" type="number" className="m-1" label="Enter Product Quantity" name="qty"></TextField>
              <TextField required fullWidth size="small" variant="outlined" type="text" className="m-1" label="Enter Product Price" step=".01" name="price"></TextField>
              <div className="modal-footer d-flex justify-content-end">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" >Save changes</button>
              </div>
            </form>
            {msgs ? <div className={msgs.msg.param}>{msgs.msg.text}</div>: <LoadingIndicator/>}
          </div>
        </div>
      </div>
    </div>
  );
}
  /*
  return(
    <div id="ProductManagement">
      <h1>Product Management</h1>

      <p>add products</p>
      <button>Add New Product</button>
      <p>Product List</p>


    </div>
  )
}
*/
export default withRouter(ProductManagement);
