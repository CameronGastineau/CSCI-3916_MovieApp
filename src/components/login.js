import React, { Component } from 'react';
import { submitLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.props.userDetails);

        updateDetails[event.target.id] = event.target.value;

        this.props.updateUserDetails(updateDetails)
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.props.userDetails));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.props.userDetails.username} type="email" placeholder="Email" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.props.userDetails.password} type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={20}>
                        <Button onClick={this.login}>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);