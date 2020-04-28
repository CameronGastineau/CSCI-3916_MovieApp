import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect, Link} from 'react-router-dom';
import { fetchMovies, setMovie } from '../actions/movieActions';
import {Carousel, Image, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import './movielist.css';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    };

    handleSelect(selectedIndex, e) {
        this.setSelectedMovie(this.props.movies[selectedIndex]);
    };

    setSelectedMovie = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    };

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    };

    getStars = (numberOfStars) => {
        let stars = [];

        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<Glyphicon glyph={'star'} key={i}/>);
        }

        return stars;
    }

    render() {

        const MovieListCarousel= ({movieList}) => {
            if (!movieList) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }

            return (
                <Carousel onSelect={this.handleSelect} indicators={false} fade={"true"} height={500}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div>
                                <LinkContainer to={'/movie/'+movie._id} onClick={()=>this.handleClick(movie)}>
                                    <Link><Image className="image" src={movie.imageURL} height={500}/></Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                {this.getStars(movie.averageRating)}
                            </Carousel.Caption>
                        </Carousel.Item>)}
                </Carousel>);
        };

        const userNotLoggedIn = (
            <Redirect to={{
                pathname: '/signin',
                state: {from: this.props.location}
            }}/>
        );

        return (
            <div>
                {this.props.loggedIn
                    ? <MovieListCarousel movieList={this.props.movies} />
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