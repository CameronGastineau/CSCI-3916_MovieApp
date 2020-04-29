import { movieActionTypes as movieConstants} from '../constants'

////INITIAL STATE:________________
var initialState = {
    movies: [],
    selectedMovie: null,
    selectedMovieUserReview: null
};

////REDUCERS - TAKES PREVIOUS STATE & ACTION, PROVIDES NEXT STATE
export default (state = initialState, action) => {

    //Don't mutate the state. Instead, create copy so we can return original in default case for unknown actions.
    var updated = Object.assign({}, state);

    switch(action.type) {
        case movieConstants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            updated['selectedMovie'] = action.movies[0];
            updated['selectedMovieUserReview'] = action.movies[0].reviews.find(review => review.userName === localStorage.getItem('username'));
            return updated;
        case movieConstants.SET_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            updated['selectedMovieUserReview'] = action.selectedMovie.reviews.find(review => review.userName === localStorage.getItem('username'));
            return updated;
        case movieConstants.FETCH_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            updated['selectedMovieUserReview'] = action.selectedMovie.reviews.find(review => review.userName === localStorage.getItem('username'));
            return updated;
        default:
            return state;
    }
}