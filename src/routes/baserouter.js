import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from '../components/authentication';
import MovieList from '../components/movielist';
import Movie from '../components/movie';

class BaseRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <div/>}/>
                <Route path="/signin" render={() => <Authentication/>}/>
                <Route path="/movielist" render={() => <MovieList/>}/>
                <Route path="/movie/:id" render={() => <Movie/>}/>
            </Switch>
        )
    }
};

export default BaseRouter;
