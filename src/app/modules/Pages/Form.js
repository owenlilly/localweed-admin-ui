import React, { Component } from "react"
import {
    Card, CardBody, CardHeader, CardFooter, Col, Row,
    Form,
    FormGroup,
    Input,
    Label, Button
} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';

import validate from "app/form/FormValidations"
import {  Field } from 'react-final-form'

class PageForm extends Component {

    render() {
        return <Form onSubmit={this.props.handleSubmit}>
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader>
                            <strong>{this.props.isEdit ? 'Edit Page' : 'New Page'} </strong>
                        </CardHeader>
                        <CardBody >

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="title">Title</Label>
                                        <Field name="title" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="title" placeholder="Title" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="slug">Slug</Label>
                                        <Field name="slug" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="slug" placeholder="Slug" {...input} readOnly={this.props.isEdit} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>

                                    <FormGroup  >
                                        <Field
                                            name="status"
                                            component="input"
                                            type="checkbox"
                                        />
                                        {' '} <Label htmlFor="status">Active</Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs="12" lg="12">
                    <Card>

                        <CardBody>

                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="ccnumber">Content </Label>
                                        <Editor
                                            style={{ minHeight: 400 }}
                                            editorState={this.props.editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={this.props.onEditorStateChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" disabled={this.props.saveInProgress} className="mr-2"><i className="fa fa-check"></i> Save</Button>
                            <Button type="button" size="sm" color="danger" onClick={this.props.goToPages} className="mr-2"><i className="fa fa-ban"></i> Cancel</Button>
                            <Button type="button" size="sm" onClick={this.props.previewPageContent}><i className="fa fa-eye"></i> Preview</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Form>
    }
}

export default PageForm