import React, { Component } from 'react';
import { Form as ReactForm, Field } from 'react-final-form'
import { connect } from 'react-redux';


import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import validate from "../../../form/FormValidations"
import { requestAuthenticateLoginData } from "./actions"
import { setLoginToken } from "app/token"

class LoginContainer extends Component {
    onSubmit = (values) => {
        this.props.requestAuthenticateLoginData(values)
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.authLogin.loginData && this.props.authLogin.loginData) {
            //save login data token on store
            setLoginToken(this.props.authLogin.loginData.token)
            this.props.history.push('/')
        }
    }
    render() {
        return (

            <ReactForm
                onSubmit={this.onSubmit}
                // validate={validate}
                render={({ handleSubmit }) => (


                    <div className="app flex-row align-items-center">
                        <Container>
                            <Row className="justify-content-center">

                                <Col md="8">
                                    {
                                        this.props.authLogin.loginDataRequested ? <div className="animated fadeIn pt-3 text-center">Loading...</div>
                                            :
                                            <CardGroup>
                                                <Card className="p-4">
                                                    <CardBody>
                                                        {this.props.authLogin.loginDataError && <Alert color="danger">
                                                            Invalid login data
                                                        </Alert>}
                                                        <Form onSubmit={handleSubmit} >
                                                            <h1>Login</h1>
                                                            <p className="text-muted">Sign In to your account</p>
                                                            <Field name="email" validate={validate.required}>
                                                                {({ input, meta }) => (
                                                                    <InputGroup className="mb-3">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="icon-user"></i>
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input className={meta.error && meta.touched ? 'is-invalid' : ''} name="email" type="text" placeholder="Email" id="validationCustomUsername" autoComplete="email" {...input} />
                                                                        {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                                    </InputGroup>
                                                                )}
                                                            </Field>
                                                            <Field name="password" validate={validate.required}>
                                                                {({ input, meta }) => (
                                                                    <InputGroup className="mb-4">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="icon-lock"></i>
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input className={meta.error && meta.touched ? 'is-invalid' : ''} name="password"  {...input} type="password" placeholder="Password" autoComplete="current-password" />
                                                                        {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                                                                    </InputGroup>
                                                                )}
                                                            </Field>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <Button color="primary" className="px-4">Login</Button>
                                                                </Col>
                                                                <Col xs="6" className="text-right">
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </CardBody>
                                                </Card>

                                            </CardGroup>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </ div>
                )}
            />
        );
    }
}

export default connect(state => ({
    authLogin: state.authLogin
}), { requestAuthenticateLoginData })(LoginContainer);
