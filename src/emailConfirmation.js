import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class EmailConfirmation extends Component{
  constructor(props) {
    super(props)
    this.state = {
      confirmation: {}
    }
  }

  componentDidMount(){
    console.log(this.props.match.params);

    let config = {
      withCredentials: true
    }

    axios.post(`https://konvinens.herokuapp.com/api/user-email-confirmation`, this.props.match.params, config)
      .then((res)=>{
        console.log(res.data);
        setTimeout(function () {
           // after 2 seconds
           window.location = res.data.redirect;
        }, 1500)
      })
      .catch((err)=>{
        console.log(err);
      })

  }
  render(){
    return(
      <h1>email confirmation</h1>
    )
  }
}

export default withRouter(EmailConfirmation);
