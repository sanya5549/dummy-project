import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { DOMAIN, LOGIN_API } from  '../../utils/url';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        E-Commerce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
          marginRight: '8px',
          width: '190px',
      },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function LoginFunction({history}){
    const classes = useStyles();
    const initLoginState = {
      username : "",
      password : ""
    }
    const [loginState, setLoginState] = React.useState(initLoginState);
    const _user = useSelector(state => state.random.username)
    const _isLoggedIn = useSelector(state => state.random.isLoggedIn);
    const dispatch = useDispatch();

    function handleSignupSubmit(e){
      e.preventDefault();
      axios.post(DOMAIN + LOGIN_API,{
        username: loginState.username,
        password: loginState.password,
      })
        .then((response) => {
          if(response.status == 200 && response.data == "SUCCESS"){
            dispatch({type: 'CHANGE_USERNAME', payload: loginState.username});
            dispatch({type: "CHANGE_IS_LOGGED_IN", payload: true});
            history.push("/products");
          }else{
            alert("wrong creds please try again!!");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("wrong creds pleasetry again!!");
        });
    }

    //input handlers

    function handleChange(e){
      switch(e.target.name){
        case 'username':
          setLoginState({
            ...loginState,
            username: e.target.value
          });
          break;
        case 'password':
          setLoginState({
            ...loginState,
            password: e.target.value
          });
          break;
      }
    }


    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div>
              <ExitToAppIcon style={{ fontSize: 100, color: "black"}}/>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </div>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="User Name"
                type="User Name"
                id="User Name"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignupSubmit}
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );

}