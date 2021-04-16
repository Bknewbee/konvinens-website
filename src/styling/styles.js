import {makeStyles} from '@material-ui/core/styles';



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
  }
}));

export default useStyles;
