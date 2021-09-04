import React, {Component} from 'react';
import {TextField} from '@material-ui/core';
import axios, {post} from 'axios';
import LoadingIndicator from '../loadingIndicator';
import {trackPromise} from 'react-promise-tracker';

import './serviceRegistrationForm.css';

class ServiceRegistrationForm extends Component{
  constructor(props) {
    super(props);
      this.state = {
        images:{tax: {value: null}, logo: {value: null}},
        serviceTypes: {
          value: ['Store', 'Driver']
        },
        categoryTypes:{
          value: [
            "Hardware",
            "SuperMarket",
            "Restuarant"
          ]
        },
        user: '',
        accountType: '',
        formControls: {
          serviceType: {
            value: 'Store'
          },
          storeName:{
              value: ""
          },
          storeRegistrationNumber:{
              value: ""
          },
          physicalAddress:{
              value: ""
          },
          location: {
            value: ""
          },
          postalAddress:{
              value: ""
          },
          email: {
              value: ""
          },
          primaryAreaCode:{
            value:""
          },
          primaryContact:{
              value: ""
          },
          secondaryAreaCode:{
            value: ""
          },
          secondaryContact:{
              value: ""
          },
          category:{
            value:"Hardware"
          },
          firstName:{
              value: ""
          },
          lastName:{
              value: ""
          },
          driverRegistrationNumber:{
              value: ""
          }
        },
        response: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.checkServiceType = this.checkServiceType.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFileChange(event){
      /*this.setState({
        image: URL.createObjectURL(event.target.files[0])
      })*/
      this.setState({response: []})

      const name = event.target.name;
      let value = "";
      if(event.target.files[0]){
        console.log("got sometin");
        value = URL.createObjectURL(event.target.files[0])
        console.log(name);
        this.setState({
          images: {
            ...this.state.images,
            [name]:{
              ...this.state.images[name],
               value
             }
           }
        });
      }else{
        console.log("got notin");
        value = null;
        this.setState({
          images: {
            ...this.state.images,
            [name]:{
              ...this.state.images[name],
               value
             }
           }
        });
      }

  }
  handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
          formControls: {
              ...this.state.formControls,
              [name]: {
                  ...this.state.formControls[name],
                  value
              }
          }
      });
      //console.log(value);/
  }


  async fileUpload(form){
    let url = `https://konvinens.herokuapp.com/api/service-registration-store`;

    const formData = new FormData(form);

    formData.append('user',this.state.user);
    formData.append('accountType',this.state.accountType);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      withCredentials: true
    }
    if(this.state.formControls.serviceType.value === "Driver"){
      url = `https://konvinens.herokuapp.com/api/service-registration-driver`;
    }
    return await trackPromise(post(url, formData, config))
  }


  onFormSubmit(e){
    e.preventDefault() // Stop form submit

    let addErros = [];
    if(!this.state.images.tax.value){
      console.error("no tax");
      addErros = this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add Tax image file'}})
      this.setState({response: addErros},
        function(){
          if (!this.state.images.logo.value) {
            console.error("no logo");
            addErros = this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add Logo image file'}})
            this.setState({response: addErros})
            //this.setState({response: this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add Logo image file'}})})
          }
        }
      )
    }
    if(!this.state.images.logo.value){
      console.error("no logo");
      addErros = this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add logo image file'}})
      this.setState({response: addErros},
        function(){
          if (!this.state.images.tax.value) {
            console.error("no tax");
            addErros = this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add tax image file'}})
            this.setState({response: addErros})
            //this.setState({response: this.state.response.concat({msg: {param: 'alert alert-danger', text:'Please add Logo image file'}})})
          }
        }
      )
    }


    if(this.state.images.tax.value && this.state.images.logo.value){
      console.log("got them");
      this.fileUpload(e.target)
      .then((res)=>{
        console.log(res.data);
        let addErros = this.state.response.concat(res.data);
        this.setState({response:addErros})
        //window.location = '/user/'+response.data.newStore.owner+'/store/'+response.data.newStore.storeName;
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
  componentDidMount(){
    let config = {
      withCredentials: true
    }

    axios.get(`https://konvinens.herokuapp.com/api/user`, config)
    .then(res => {
      console.log(res.data);
      if(res.data.user){
        console.log("logged in");
      }else{
        setTimeout(function () {
           // after 2 seconds
           window.location = '/log-in';
        }, 1)
        //window.location = res.data.redirect
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  checkServiceType(){
    if(this.state.formControls.serviceType.value === "Store"){
      return <div>
                <div className="form-group">
                  <label htmlFor="category"> Select the type of Online Store you would to Open</label>
                  <select className="custom-select my-1 mr-sm-2" id="category" name="category" value={this.state.formControls.category.value} onChange={this.handleChange}>
                    {this.state.categoryTypes.value.map((e, i)=>{
                      return <option key={i}>{e}</option>
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <p>Store Details</p>
                  <TextField required fullWidth variant="outlined" type="text" label="Enter Store Name" name="storeName" value={this.state.formControls.storeName.value} onChange={this.handleChange}></TextField>
                  <small>Store Name</small>
                  <TextField required type="email" fullWidth variant="outlined" label="Enter Store Email" name="email" value={this.state.formControls.email.value} onChange={this.handleChange}></TextField>
                  <small>Store Email</small>
                  <TextField required fullWidth type="number" variant="outlined" label="Enter Store Registration Number" name="storeRegistrationNumber" value={this.state.formControls.storeRegistrationNumber.value} onChange={this.handleChange}></TextField>
                  <small>CIPA Registration Number</small>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-12">
                    <div className="row">
                      <div className=" col-md-6 col-4">
                        <small>Company Logo</small>
                      </div>
                      <div className="col-md-6 col-6">
                        <input type="file" name="logo" onChange={this.onFileChange}></input><br/>
                      </div>
                      <div className="col-12">
                        <img src={this.state.images.logo.value} className="img-fluid imgPreview" alt="Logo"></img><br/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-4">
                        <small>Tax Clearance Certificate</small>
                      </div>
                      <div className="col-md-6 col-6">
                        <input type="file" name="tax" onChange={this.onFileChange}></input><br/>
                      </div>
                      <div className="col-12">
                        <img src={this.state.images.tax.value} className="img-fluid imgPreview" alt="Tax Clearance"></img><br/>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-sm-6">
                    <p>Primary Phone</p>
                    <div className="row">
                      <div className="col-4">
                        <TextField required fullWidth size="small" variant="outlined" type="number" label="+267" name="primaryAreaCode" value={this.state.formControls.primaryAreaCode.value} onChange={this.handleChange}></TextField>
                        <small>Area Code</small>
                      </div>
                      <div className="col-8">
                        <TextField required  fullWidth size="small" variant="outlined" type="number" label="71 234 567" name="primaryContact" value={this.state.formControls.primaryContact.value} onChange={this.handleChange}></TextField>
                        <small>Phone Number</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <p>Secondary Phone</p>
                    <div className="row">
                      <div className="col-4">
                        <TextField  fullWidth size="small" variant="outlined" type="text" label="123" name="secondaryAreaCode" value={this.state.formControls.secondaryAreaCode.value} onChange={this.handleChange}></TextField>
                        <small>Area Code</small>
                      </div>
                      <div className="col-8">
                        <TextField  fullWidth size="small" variant="outlined" type="number" label="4567" name="secondaryContact" value={this.state.formControls.secondaryContact.value} onChange={this.handleChange}></TextField>
                        <small>Phone Number</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <p>Address</p>
                  <div className="row">
                    <div className='col-sm-6'>
                      <TextField required fullWidth size="small" variant="outlined" type="text" label="City/Town/Village" name="location" value={this.state.formControls.location.value} onChange={this.handleChange}></TextField>
                      <small>City</small>
                    </div>
                    <div className='col-sm-6'>
                      <TextField required fullWidth size="small" variant="outlined" type="text" label="PO Box 1234" name="postalAddress" value={this.state.formControls.postalAddress.value} onChange={this.handleChange}></TextField>
                      <small>PO Box</small>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-sm-6'>
                      <TextField required fullWidth size="small" variant="outlined" type="text" label="Ward/Street 123" name="physicalAddress" value={this.state.formControls.physicalAddress.value} onChange={this.handleChange}></TextField>
                      <small>Physical Adress</small>
                    </div>
                    <div className='col'>
                    </div>
                  </div>
                </div>
              {/*
                <label htmlFor="category"> Select Store Category</label>
                <select className="custom-select my-1 mr-sm-2" id="category" name="category" value={this.state.formControls.category.value} onChange={this.handleChange}>
                  {this.state.categoryTypes.value.map((e, i)=>{
                    return <option key={i}>{e}</option>
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="storeNameInput" >Store Name</label>
                <input type="text" className="form-control" id="storeNameInput" name="storeName" placeholder="Enter Store Name" value={this.state.formControls.storeName.value} onChange={this.handleChange}></input>
                <label htmlFor="registrationInput" >Registration Number</label>
                <input type="text" className="form-control" id="registrationInput" name="storeRegistrationNumber" placeholder="Enter Store Registration Number" value={this.state.formControls.storeRegistrationNumber.value} onChange={this.handleChange}></input>
              </div>
              <hr/>
              <input type="email" id="defaultRegisterFormEmail" className="form-control mb-4" placeholder="E-mail" name="email" value={this.state.formControls.email.value} onChange={this.handleChange}/>
              <hr/>
              <div className="form-group">
                <label htmlFor="primaryContactInput">Primary Contact Details</label>
                <input type="text" className="form-control" id="primaryContactInput" name="primaryContact" placeholder="Enter Primary Contact Details" value={this.state.formControls.primaryContact.value} onChange={this.handleChange}></input>
                <label htmlFor="secondaryContactInput" >Secondary Contact Details</label>
                <input type="text" className="form-control" id="secondaryContactInput" name="secondaryContact" placeholder="Enter Secondary Contact Details" value={this.state.formControls.secondaryContact.value} onChange={this.handleChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="postalAddressInput" >Postal Address</label>
                <input type="text" className="form-control" id="postalAddressInput" name="postalAddress" placeholder="Enter Postal Address" value={this.state.formControls.postalAddress.value} onChange={this.handleChange}></input>
                <label htmlFor="physicalAddressInput" >Physical Address</label>
                <input type="text" className="form-control" id="physicalAddressInput" name="physicalAddress" placeholder="Enter Physical Address" value={this.state.formControls.physicalAddress.value} onChange={this.handleChange}></input>
                <label htmlFor="location">City/Town/Village</label>
                <input type="text" className="form-control" id="location" name="location" placeholder="City/Town/Village" value={this.state.formControls.location.value} onChange={this.handleChange}></input>
              </div>
              <hr/>
            */}
            </div>
    }else if (this.state.formControls.serviceType.value === "Driver") {
      return <div>
              <div className="form-group">
                <p>Name</p>
                <div className="row">
                  <div className="col-sm-6">
                  <input type="text" className="form-control" name="firstName" placeholder="John" value={this.state.formControls.firstName.value} onChange={this.handleChange}></input>
                    <small>First Name</small>
                  </div>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="lastNameInput" name="lastName" placeholder="Doe" value={this.state.formControls.lastName.value} onChange={this.handleChange}></input>
                    <small>Last Name</small>
                  </div>
                </div>
                <br/>
                <label htmlFor="driverRegistrationNumber" >Driver Registration Number</label>
                <input type="text" className="form-control" id="driverRegistrationNumber" name="driverRegistrationNumber" placeholder="0123 4567 89" value={this.state.formControls.driverRegistrationNumber.value} onChange={this.handleChange}></input>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <p>Primary Phone</p>
                  <div className="row">
                    <div className="col-4">
                      <input type="text"  className="form-control" placeholder="+267"></input>
                      <small>Area Code</small>
                    </div>
                    <div className="col-8">
                      <input type="text" className="form-control" name="primaryContact" placeholder="71 234 567" value={this.state.formControls.primaryContact.value} onChange={this.handleChange}></input>
                      <small>Phone Number</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <p>Secondary Phone</p>
                  <div className="row">
                    <div className="col-4">
                      <input type="text"  className="form-control" placeholder="123"></input>
                      <small>Area Code</small>
                    </div>
                    <div className="col-8">
                      <input type="text" className="form-control" name="primaryContact" placeholder="1234" value={this.state.formControls.primaryContact.value} onChange={this.handleChange}></input>
                      <small>Phone Number</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <p>Address</p>
                <div className="row">
                  <div className='col-sm-6'>
                    <input type="text" className="form-control" id="location" name="location" placeholder="City/Town/Village" value={this.state.formControls.location.value} onChange={this.handleChange}></input>
                    <small>City</small>
                  </div>
                  <div className='col-sm-6'>
                    <input type="text" className="form-control" id="postalAddressInput" name="postalAddress" placeholder="1234" value={this.state.formControls.postalAddress.value} onChange={this.handleChange}></input>
                    <small>PO Box</small>
                  </div>
                </div>
                <div className="row">
                  <div className='col-sm-6'>
                    <input type="text" className="form-control" id="physicalAddressInput" name="physicalAddress" placeholder="Ward/Street 123" value={this.state.formControls.physicalAddress.value} onChange={this.handleChange}></input>
                    <small>Physical Adress</small>
                  </div>
                  <div className='col'>
                  </div>
                </div>
              </div>
              {/*
              <div className="form-group">
                <label htmlFor="firstNameInput" >First Name</label>
                <input type="text" className="form-control" id="firstNameInput" name="firstName" placeholder="Enter First Name" value={this.state.formControls.firstName.value} onChange={this.handleChange}></input>
                  <label htmlFor="lastNameInput" >Last Name</label>
                  <input type="text" className="form-control" id="lastNameInput" name="lastName" placeholder="Enter Last Name" value={this.state.formControls.lastName.value} onChange={this.handleChange}></input>
                <label htmlFor="driverRegistrationNumber" >Driver Registration Number</label>
                <input type="text" className="form-control" id="driverRegistrationNumber" name="driverRegistrationNumber" placeholder="Enter Driver Registration Number" value={this.state.formControls.driverRegistrationNumber.value} onChange={this.handleChange}></input>
              </div>
              <hr/>
              <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" name="email" value={this.state.formControls.email.value} onChange={this.handleChange}/>
              <hr/>
              <div className="form-group">
                <label htmlFor="primaryContactInput">Primary Contact Details</label>
                <input type="text" className="form-control" id="primaryContactInput" name="primaryContact" placeholder="Enter Primary Contact Details" value={this.state.formControls.primaryContact.value} onChange={this.handleChange}></input>
                <label htmlFor="secondaryContactInput" >Secondary Contact Details</label>
                <input type="text" className="form-control" id="secondaryContactInput" name="secondaryContact" placeholder="Enter Secondary Contact Details" value={this.state.formControls.secondaryContact.value} onChange={this.handleChange}></input>
              </div>
              <hr/>
              */}
             </div>
    }
  }
  render(){
    return(
      <div id="ServiceRegistrationForm" className="container-fluid">
        <h1>Service Registration</h1>
        <form onSubmit={this.onFormSubmit} method="post" encType="multipart/form-data" autoComplete="off">
          <div className="form-group">
            <label className="my-1 mr-2" htmlFor="serviceType">Select the type of Service you would like to provide</label>
            <select className="custom-select my-1 mr-sm-2" id="serviceType" name="serviceType" value={this.state.formControls.serviceType.value} onChange={this.handleChange}>
              {this.state.serviceTypes.value.map((e, i)=>{
                return <option key={i}>{e}</option>
              })}
            </select>
          </div>
          {/* UPLOAD LOGO
          <div className="form-group">
            <input type="file" className="form-control-file col-12 text-center" id="image" name="image" onChange={this.onFileChange}></input>
          </div>
          <div className="imgPreview">
          <img src={this.state.image} className="img-fluid"></img>
          </div>
          */}
          {this.checkServiceType()}
          {
            this.state.response ?
            this.state.response.map((msg, i)=>{
              return <div key={i} className={msg.msg.param}>{msg.msg.text} {msg.msg.param.split("-")[1] === "success" ? <a href="/your-account"><br/>Go back to your account</a>: console.error("bad")}</div>
            })
              :
            <LoadingIndicator/>
          }
          {/*this.state.finalImags.length > 0 ? <img src={"data:image/png;base64,"+this.state.finalImags[0].taxImg.imgBuffer}></img>:<p></p>*/}
          <button className="btn btn-info my-4 btn-block" type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default ServiceRegistrationForm;
