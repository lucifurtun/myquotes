import React from "react";
import { Route, Router as ReactRouter, Switch } from "react-router";
import { Quotes } from "../screens/Quotes";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import { history } from "../App";

class Router extends React.Component {
    render() {
        return (
            <ReactRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/quotes" component={Quotes}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                </Switch>
            </ReactRouter>
        )
    }
}

export default Router
