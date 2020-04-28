import runtimeEnv from '@mars/heroku-js-runtime-env';
import {movieActionTypes as actionTypes} from "../constants";


////SYNCHRONOUS ACTION CREATORS:

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

////THUNK ACTION CREATORS:

export function fetchMovies() {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(moviesFetched(res));
            })
            .catch((e) => {
                console.log(e)
            });
    }
}

export function fetchMovie(id) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${id}?reviews=true`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(movieFetched(res));
            })
            .catch((e) => console.log(e));
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function createReview(review) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchMovie(review.movieID));
            })
            .catch((e) => console.log(e));
    }
}

export function updateReview(review) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchMovie(review.movieID));
            })
            .catch((e) => console.log(e));
    }
}