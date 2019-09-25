import React from "react";
import { Route, Router as ReactRouter, Switch } from "react-router";
import { history } from "../App";
import { map } from 'lodash'
import { ROUTES } from "../routing";

class Router extends React.Component {
    render() {
        return (
            <ReactRouter history={history}>
                <Switch>
                    {/*<Route exact path="/" component={Home}/>*/}
                    {/*<Route path="/quotes" component={Quotes}/>*/}
                    {/*<Route path="/login" component={Login}/>*/}
                    {/*<Route path="/signup" component={Signup}/>*/}
                    {/*<Route path="/inactive" component={InactiveAccount}/>*/}

                    {
                        map(ROUTES, (route, idx) => {
                            return (
                                <Route exact key={idx} path={route.path} component={route.component}/>
                            )
                        })
                    }

                </Switch>
            </ReactRouter>
        )
    }
}

export default Router
