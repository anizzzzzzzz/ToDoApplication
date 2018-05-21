import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AddTask from "../components/AddTask";
import Index from "../components/Index";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/add-task" component={AddTask}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;