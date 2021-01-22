import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnauthenticatedPageComponent from '../Error/Unauthenticated';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    cardroot: {
        maxWidth: 500,
        marginLeft: 400,
        minHeight: 300
    },
}));

export default function Checkout(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const _user = useSelector(state => state.random.username)
    const _isLoggedIn = useSelector(state => state.random.isLoggedIn);
    const _cart = useSelector(state => state.random.cart);
    const _product = useSelector(state => state.random.products);
    return(
        _isLoggedIn == false ? <UnauthenticatedPageComponent/> : (
            <Card className={classes.cardroot}>
                <CardContent>
                    <Typography  variant="h5" component="h2">
                        YOUR TOTAL BILL
                    </Typography>
                    <ul style={{listStyle:'none'}}>
                    {Object.keys(_cart).map(value =>
                    _cart[value] == 0 ? null :
                    <li>{_product[value-1].name} ({_cart[value]} items): {_product[value-1].price * _cart[value]} </li>
                    )}
                    </ul>
                </CardContent>
            </Card>
        )

    )
}