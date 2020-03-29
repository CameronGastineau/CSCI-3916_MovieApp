import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getMovies, setMovie } from '../actions/movieActions';

class MovieList extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getMovies());
    }

    setSelectedMovie = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {

        const Movie = props => (
            <tr align={"left"}>
                <td>{props.movie.title}</td>
                <td>{props.movie.yearReleased}</td>
                <td>{props.movie.genre}</td>
                <td>
                    <Link to={"/movie/" + props.movie._id} onClick={()=>this.setSelectedMovie(props.movie)}>Details</Link>
                </td>
            </tr>
        )

        const userLoggedIn = (
            <div>
                <h3>Movie List</h3>
                <table align="center" className="table table-striped" style={{ marginTop: 20, width:"80%" }} >
                    <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Release Date</th>
                        <th>Genre</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody id={"tbody"}>
                        { this.props.movies.map((currentMovie, i) =>
                            <Movie movie={currentMovie} key={i}/>
                            )}
                    </tbody>
                </table>
            </div>
        );

        const userNotLoggedIn = (
            <Redirect to={{
                pathname: '/signin',
                state: {from: this.props.location}
            }}/>
        )

        return (
            <div>
                {this.props.loggedIn
                    ? userLoggedIn
                    : userNotLoggedIn}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList)