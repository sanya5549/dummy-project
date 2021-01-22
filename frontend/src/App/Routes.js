import React from 'react';
import { Route, Switch} from 'react-router-dom';
//Components
import HomeComponenet from '../Components/Home/Home';
import LoginComponent from '../Components/Login/login';
import Products from '../Components/Products/products';
import Product from '../Components/Products/product';
import Checkout from '../Components/Checkout/checkout';
export default function Routes({history}){
    return(
        <Switch>
            <Route exact path="/" >
                <HomeComponenet/>
            </Route>
            <Route exact path="/login">
                <LoginComponent history={history}/>
            </Route>
            <Route exact path="/products">
                <Products history={history}/>
            </Route>
            <Route exact path="/product/:id">
                <Product history={history}/>
            </Route>
            <Route exact path="/checkout">
                <Checkout />
            </Route>
        </Switch>
    );
}