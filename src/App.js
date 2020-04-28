import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux'

import store from './stores/store'
import './App.css';
import MovieHeader from './components/movieheader';
import BaseRouter from "./routes/baserouter";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <MovieHeader/>
                        <BaseRouter/>
                    </div>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;