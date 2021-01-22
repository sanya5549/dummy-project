import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppSharp from '@material-ui/icons/ExitToAppSharp';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavbarComponent({history}) {

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const _isLoggedIn = useSelector(state => state.random.isLoggedIn);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  //redirection functions
  const redirectToLogin = () => {
    history.push("/login");
  }

  const redirectToHome = () => {
    history.push("/");
  }

  function handleLogout(){
    dispatch({type: 'CHANGE_USERNAME', payload: ""});
    dispatch({type: 'CHANGE_IS_LOGGED_IN', payload: false});
    history.push("/products");
  }
  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenuAfterLogin = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenuBeforeLogin = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    >
    <MenuItem>
      <IconButton aria-label="show 11 new notifications" color="inherit">
        <ExitToAppSharp />
      </IconButton>
      <p onClick={redirectToLogin}>Login</p>
    </MenuItem>
  </Menu>
  )

  const AuthBeforeLogin = (
    <div className={classes.sectionDesktop}>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge color="secondary">
          <PersonAdd />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge color="secondary">
          <ExitToAppSharp />
        </Badge>
      </IconButton>
    </div>
  );

  const AuthBeforeLoginSignup = (
    <div className={classes.sectionDesktop}>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge color="secondary" style={{fontSize:'0.8em'}} onClick={redirectToLogin}>
          Login
        </Badge>
      </IconButton>
    </div>
  );

  const AuthAfterLogin = (
    <div className={classes.sectionDesktop}>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <IconButton color="inherit" onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap onClick={redirectToHome}>
            E-Commerce
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {_isLoggedIn ? AuthAfterLogin : AuthBeforeLoginSignup}
        </Toolbar>
      </AppBar>
      {_isLoggedIn ? renderMobileMenuAfterLogin : renderMobileMenuBeforeLogin}
    </div>
  );
}
