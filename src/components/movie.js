import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {getMovie} from '../actions/movieActions';

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (!this.props.selectedMovie)
            dispatch(getMovie(this.props.id));
    }

    render() {

        const Actor = ({actor}) => {
            if (!actor) {
                return null;
            }
            return (
                <tr align={"left"}>
                    <td>{actor.actorName}</td>
                    <td>{actor.characterName}</td>
                </tr>
            )
        }

        const MovieDetails = ({movie}) => {
            if (!movie) {
                return (
                    <div>Select a movie from the movie list to see details.</div>
                )
            }
            return (
                <div>
                    <h2>Title: {movie.title}</h2>
                    <h4>Year Released: {movie.yearReleased}</h4>
                    <h4>Genre: {movie.genre}</h4>

                    <table align={"center"} className="table table-striped" style={{marginTop: 20, width: "80%"}}>
                        <thead>
                        <tr>
                            <th>Actor Name</th>
                            <th>Character Name</th>
                        </tr>
                        </thead>
                        <tbody id={"tbody"}>
                        {movie.actors.map((currentActor, i) =>
                            <Actor actor={currentActor} key={i}/>
                        )}
                        </tbody>
                    </table>
                </div>
            )
        }

        const userNotLoggedIn = (
            <Redirect to={{
                pathname: '/signin',
                state: {from: this.props.location}
            }}/>
        )

        return (
            <div>
                {this.props.loggedIn
                    ? <MovieDetails movie={this.props.selectedMovie}/>
                    : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.auth.loggedIn,
        selectedMovie: state.movie.selectedMovie,
        id: ownProps.match.params.id
    }
};

export default withRouter(connect(mapStateToProps)(Movie));