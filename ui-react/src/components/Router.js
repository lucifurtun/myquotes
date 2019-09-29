import React from "react";
import { Route, Router as ReactRouter, Switch } from "react-router";
import { history } from "../App";
import { map } from 'lodash'
import { ROUTES } from "../routing";
import RouterManager from "./RouterManager";


class Router extends React.Component {
    render() {
        return (
            <ReactRouter history={history}>
                <Switch>
                    {
                        map(ROUTES, (route, idx) => {
                            return (
                                <Route
                                    exact
                                    key={idx}
                                    path={route.path}
                                    render={(props) => {
                                        return (
                                            <RouterManager route={route}/>
                                        )
                                    }}
                                />
                            )
                        })
                    }
                </Switch>
            </ReactRouter>
        )
    }
}


export default Router
