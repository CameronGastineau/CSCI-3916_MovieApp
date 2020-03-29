import React, { Component} from 'react';
import { connect } from 'react-redux'
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';
import {Redirect} from "react-router-dom";

class Authentication extends Component {

    constructor(props){
        super(props);

        this.state = {
            toggleReg: false
        };

        this.showLogin = this.showLogin.bind(this);
        this.showReg = this.showReg.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){

    }

    showLogin(){
        this.setState({
            toggleReg: false
        });
    }

    showReg(){
        this.setState({
            toggleReg: true
        });
    }

    logout(){
        this.props.dispatch(logoutUser());
    }

    render(){

        const userNotLoggedIn = (
            <div>
                <br></br>
                <button onClick={this.showLogin}>Login</button>
                <button onClick={this.showReg}>Register</button>
                <br></br>
                <br></br>
                { this.state.toggleReg ? <Register/> : <Login/> }
            </div>
        );

        const userLoggedIn = (
            <div>
                <Redirect to={{
                    pathname: '/movielist',
                    state: {from: this.props.location}
                }}/>
            </div>
        );

        return (
            <div>
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Authentication)