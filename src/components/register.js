import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Register extends Component {

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.props.userDetails);

        updateDetails[event.target.id] = event.target.value;

        this.props.updateUserDetails(updateDetails)
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.props.userDetails));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.props.userDetails.name} type="text" placeholder='Name' />
                    </Col>
                </FormGroup>

                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.props.userDetails.username} type="email" placeholder='Email' />
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
                        <Button onClick={this.register}>Register</Button>
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

export default connect(mapStateToProps)(Register);