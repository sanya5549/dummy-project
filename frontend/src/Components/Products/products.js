import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN, LIST_PRODUCTS } from  '../../utils/url';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop:"10vh",
      paddingLeft:"2em",
      paddingRight: "2em",
      flexGrow: 1,
    },
    cardroot: {
      minWidth: 275,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}));


export default function ProductsComponent({history}){

    const _products = useSelector(state => state.random.products);
    const _isLoggedIn = useSelector(state => state.random.isLoggedIn);
    const _cart = useSelector(state => state.random.cart);
    const [products, updateProd] = React.useState(_products);
    const [hello, updateHello] = React.useState(1);
    const [cart, updateCart] = React.useState(_cart);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=> {
      if(products == null){
        axios.get(DOMAIN + LIST_PRODUCTS)
        .then((response) => {
          if(response.status == 200){
            updateProd(response.data);
            dispatch({type:"CHANGE_PRODUCTS", payload:response.data});
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, [products]);

    useEffect(() => {
      dispatch({type:"CHANGE_CART", payload:cart});
    }, [hello]);

    function getemptyCart(data){
      var newCart = {};
      data.map(product => {
        newCart[product.id] = 0;
      });
      return newCart;
    }

    function updateCartHandle(type, id){
      var newCart = (cart == null ? getemptyCart(products) : cart);
      if(type == 0){
        newCart[id] = newCart[id] <= 0 ? 0 : newCart[id]-1;
      }else{
        newCart[id] = newCart[id] + 1;
      }
      updateCart(newCart);
      updateHello(hello + 1);
    }

    function prodDescription(id){
      history.push("/product/" + id.toString());
    }

    function checkout(){
      if(_isLoggedIn){
        history.push("/checkout");
      }else{
        alert("Please log in first!!");
      }
    }


    return(
      products == null ? null : (
        <div className={classes.root}>
          <Grid container spacing={3} style={{marginBottom:"3em"}}>
            <Button variant="contained" color="primary" onClick={checkout}>
                CHECKOUT
            </Button>
          </Grid>
          <Grid container spacing={3} >
            {products.map(product => (
              <Grid item xs={3}>
                <Card className={classes.cardroot}>
                  <CardContent style={{cursor:'pointer'}}>
                    <img src="/resources/pord.jpeg"  onClick={() => prodDescription(product.id)} style={{width:"100%"}}></img>
                    <Typography variant="h5" component="h2" onClick={() => prodDescription(product.id)}>
                     {product.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                     {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ alignSelf: "end" }}>
                    <i className="fa fa-minus" aria-hidden="true" onClick={() => updateCartHandle(0, product.id)}  style={{cursor:"pointer"}}></i>
                    <p>{cart == null ? 0 : cart[product.id] }</p>
                    <i className="fa fa-plus" aria-hidden="true"  onClick={() => updateCartHandle(1, product.id)} style={{ cursor:"pointer"}}></i>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

      )
    )
}