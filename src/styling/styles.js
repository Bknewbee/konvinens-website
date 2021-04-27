import {makeStyles} from '@material-ui/core/styles';

import ShoppingBG from '../images/shopping-bag-kelly-sikkema-1Pgq9ZpIatI-unsplash.jpg'


const useStyles = makeStyles((theme)=>({
  //UserRegistration Styles
  paperStyle: {
    padding: '30px 20px',
    backgroundColor: theme.palette.background.paper,
    maxWidth: '1000px',
    margin: '20px auto'
  },
  headerStyle:{
    margin: '0'
  },
  avatarStyle:{
    backgroundColor: '#a3124e'
  },
  //Log in Form
  logIn:{
    backgroundImage: `url(${ShoppingBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  logInForm:{
    marginTop: '200px'
  },
  //Form style
  formStyle:{
    backgroundColor: '#fcfcf5',
    padding: "10px",
    borderRadius: "5px"
  }
}));

export default useStyles;
