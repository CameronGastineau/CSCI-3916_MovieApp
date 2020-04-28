import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {Panel, ListGroup, ListGroupItem, Button, Glyphicon, Image, Form, FormGroup, FormControl} from 'react-bootstrap';

import {fetchMovie, createReview, updateReview} from '../actions/movieActions';
import returnIcon from  '../return.png';

class Movie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userReview: {
                _id: null,
                movieID: '',
                rating: 5,
                review: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateUserReviewProperty = this.updateUserReviewProperty.bind(this);
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.setReviewID = this.setReviewID.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (!this.props.selectedMovie)
            dispatch(fetchMovie(this.props.id));
    }

    setReviewID() {
        //Find the current user's review, if it exists, and set state userReview to it. If nothing else, set movieID to current movie
        if (this.props.selectedMovie !== null) {

            let review = this.props.selectedMovie.reviews.find(review => review.userName === localStorage.getItem('username'));

            if (review) {
                this.updateUserReviewProperty("_id", review._id)
            }
        }
    }

    handleChange(event) {
        let updateDetails = Object.assign({}, this.state.userReview);

        updateDetails[event.target.id] = event.target.value;

        this.setState({
            userReview: updateDetails
        });
    }

    updateUserReviewProperty(propertyName, newValue) {
        let updateDetails = Object.assign({}, this.state.userReview);

        updateDetails[propertyName] = newValue;

        this.setState({
            userReview: updateDetails
        });
    }

    handleSubmitButtonClick() {
        const {dispatch} = this.props;

        if (this.state.userReview === null || this.state.userReview.review === '') {
            alert("Please enter a comment before submitting.");
            return;
        }

        this.setReviewID();

        if (this.props.selectedMovie._id !== undefined && this.props.selectedMovie._id != null) {
            this.updateUserReviewProperty('movieID', this.props.selectedMovie._id);
        } else {
            this.updateUserReviewProperty('movieID', this.props.id);
        }

        if (this.state.userReview._id === undefined || this.state.userReview._id === null) {
            dispatch(createReview(this.state.userReview))
        } else {
            dispatch(updateReview(this.state.userReview))
        }
    }

    getStars = (numberOfStars) => {
        let stars = [];

        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<Glyphicon glyph={'star'} key={i}/>);
        }

        return stars;
    }

    render() {
        const Actor = ({actor, i}) => {
            if (!actor) {
                return null;
            }
            return (
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
            )
        };

        const Review = ({review, i}) => {
          if (!review) {
              return null;
          }

          let stars = [];

          for (let i = 0; i < review.rating; i++) {
             stars.push(<Glyphicon glyph={'star'} key={i}/>);
          }

          return(
              <blockquote className="blockquote mb-0" key={i}>
                  <p>
                      {' '}
                      {stars}
                      <br/>
                      {review.review}
                      {' '}
                  </p>
                  <footer className="blockquote-footer">
                      {review.userName}
                  </footer>
              </blockquote>
          )
        };

        const MovieDetails = ({movie}) => {
            if (movie === undefined || movie === null || movie.actors === undefined) {
                return (
                    <div>
                        <br/>
                        Select a movie from the movie list to see details.
                    </div>
                )
            }
            return (
                <div>
                    <br/>
                    <Image className="image" src={movie.imageURL} height={500}/>
                    <br/>
                    <br/>
                    <Link>
                        <img alt={"Return Icon"} width={"20px"} height={"20px"} src={returnIcon} onClick={() =>this.props.history.push('/movielist')} />
                    </Link>
                    <br/>
                    <h1>Average Rating: {this.getStars(movie.averageRating)} </h1>
                    <br/>
                    <Panel>
                        <Panel.Heading>
                            <b>Actors</b>
                        </Panel.Heading>
                        <ListGroup>
                            <ListGroupItem>
                                {movie.actors
                                    ? movie.actors.map((currentActor, i) =>
                                        <Actor actor={currentActor} key={i}/>
                                        )
                                    : null
                                }
                            </ListGroupItem>
                        </ListGroup>
                    <Panel.Body>
                        {
                            movie.actors
                                ? movie.reviews.map(
                                    (currentReview, i) => <Review review={currentReview} key={i}/>
                                    )
                                : null
                        }
                    </Panel.Body>
                    </Panel>
                </div>
            )
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
                    ? <MovieDetails movie={this.props.selectedMovie}/>
                    : userNotLoggedIn}

                <Form>
                    <br/>
                    <br/>
                    <FormGroup controlId={"rating"} align={"center"} hidden={this.props.selectedMovie === null || this.props.selectedMovie === undefined}>
                        <p>Rating:</p>
                        <FormControl
                            onChange={this.handleChange}
                            style={{width:"25%"}}
                            value={this.state.userReview ? this.state.userReview.rating : 5}
                            min={1}
                            max={5}
                            type="range"
                            key={"rating"}
                        />
                    </FormGroup>

                    <FormGroup controlId={"review"} align={"center"} hidden={this.props.selectedMovie === null || this.props.selectedMovie === undefined}>
                        <p>Comment:</p>
                        <FormControl
                            onChange={this.handleChange}
                            style={{width:"50%"}}
                            value={this.state.userReview ? this.state.userReview.comment : ''}
                            type="text"
                            placeholder="Please enter your comment here."
                            key={"review"}
                            />
                    </FormGroup>

                    <Button onClick={this.handleSubmitButtonClick} variant="primary" type="submit" hidden={this.props.selectedMovie === null || this.props.selectedMovie === undefined}>Submit</Button>

                </Form>

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