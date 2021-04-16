import React from 'react';
import {Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import useStyles from '../styling/styles';

/*
class UserRegistration extends Component  {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <h1>Sign Up Form</h1>
    )
  }
}
*/

const UserRegistration = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    termsAndConditions: false,
    serviceProvider: false,
  });

  const handleChange = (event) =>{
    setState({...state, [event.target.name]: event.target.checked})
  }

  return(
    /*
    <Grid container>
      <Grid item xs={6}>
        <Paper className={classes.paperStyle}>
          Hello
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation="5" className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarStyle}>
            </Avatar>
            <h1 className={classes.headerStyle}>Welcome to Konvinens</h1>
            <Typography variant="caption" gutterBottom>
              Complete the form to create account
            </Typography>
          </Grid>
          <form>
            <TextField required fullWidth label="Name" />
            <TextField required fullWidth label="E-mail" />
            <TextField required fullWidth label="Phone Number" />
            <TextField required fullWidth label="Password" />
            <TextField required fullWidth label="Confirm Password" />
            <FormControlLabel
              control={<Checkbox
                        checked={state.serviceProvider}
                        onChange={handleChange}
                        name="serviceProvider"
                      />}
              label="I would like to register as a service provider"
            />
            <FormControlLabel
              control={<Checkbox
                        checked={state.termsAndConditions}
                        onChange={handleChange}
                        name="termsAndConditions"
                      />}
              label="I acccept the terms and conditions"
            />
            <br/>
            <Button  type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
    */
    <Paper elevation="5" className={classes.paperStyle}>
      <Grid container>
        <Grid item md={6}>
          Konvinens Details & Images
        </Grid>
        <Grid item md={6} >
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
          </Avatar>
          <h1 className={classes.headerStyle}>Welcome to Konvinens</h1>
          <Typography variant="caption" gutterBottom>
            Complete the form to create account
          </Typography>
        </Grid>
        <form>
          <TextField required fullWidth label="Name" placeholder="Full Personal Name or Company Name"/>
          <TextField required fullWidth label="E-mail" placeholder="Enter email address"/>
          <TextField required fullWidth label="Phone Number" placeholder="Enter Phone Number"/>
          <TextField required fullWidth label="Password" placeholder="Password should be more than 5 characters"/>
          <TextField required fullWidth label="Confirm Password" placeholder="Enter the same password"/>
          <FormControlLabel
            control={<Checkbox
                      checked={state.serviceProvider}
                      onChange={handleChange}
                      name="serviceProvider"
                    />}
            label="I would like to register as a service provider"
          />
          <FormControlLabel
            control={<Checkbox
                      checked={state.termsAndConditions}
                      onChange={handleChange}
                      name="termsAndConditions"
                    />}
            label="I acccept the terms and conditions"
          />
          <br/>
          <Button  type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default UserRegistration
