import { movieActionTypes as movieConstants} from '../constants'

////INITIAL STATE:________________
var initialState = {
    movies: [],
    selectedMovie: null
};

////REDUCERS - TAKES PREVIOUS STATE & ACTION, PROVIDES NEXT STATE
export default (state = initialState, action) => {

    //Don't mutate the state. Instead, create copy so we can return original in default case for unknown actions.
    var updated = Object.assign({}, state);

    switch(action.type) {
        case movieConstants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            updated['selectedMovie'] = action.movies[0];
            return updated;
        case movieConstants.SET_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case movieConstants.FETCH_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        default:
            return state;
    }
}