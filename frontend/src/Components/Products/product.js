import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:"10vh",
    paddingLeft:"2em",
    paddingRight: "2em",
    flexGrow: 1,
  },
  cardroot:{
    width:"100%",
    height:"100%"
  },
  description:{
    marginLeft:"3em",
    marginRight:"3em"
  }
}));

export default function Product({history}){
  const classes = useStyles();
  const dispatch = useDispatch();
  const _products = useSelector(state => state.random.products);
  let { id } = useParams();
  return(
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <img src="/resources/pord.jpeg" style={{width:"100%"}}></img>
        </Grid>
        <Grid item xs={7}>
          <Card className={classes.cardroot}>
            <Typography variant="h5" component="h2">
              <p>NAME : {_products[id-1].name}</p>
            </Typography>
            <p>ID : {_products[id-1].id}</p>
            <p>MANUFACTURER : {_products[id-1].manufacturer}</p>
            <p>PRICE : {_products[id-1].price}</p>
            <p className={classes.description}>DESCRIPTION : {_products[id-1].description} </p>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}