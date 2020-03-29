import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import Authentication from './components/authentication';
import MovieList from './components/movielist';
import Movie from './components/movie';
import {HashRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './stores/store'

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <MovieHeader/>
                        <Route exact path="/" render={() => <div/>}/>
                        <Route path="/signin" render={() => <Authentication/>}/>
                        <Route path="/movielist" render={() => <MovieList/>}/>
                        <Route path="/movie/:id" render={() => <Movie/>}/>
                    </div>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;