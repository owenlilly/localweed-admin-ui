import React, { Component } from "react"
import {
    Card, CardBody, CardHeader, CardFooter, Col, Row,
    Form,
    FormGroup,
    Input,
    Label, Button,
    Table
} from 'reactstrap';
import _ from "lodash"
import moment from "moment"

import validate from "app/form/FormValidations"
import { Field } from 'react-final-form'
import FileInputComponent from 'react-file-input-previews-base64'
import TimePicker from 'rc-time-picker';
import { AppSwitch } from '@coreui/react'
import { localApiUrl } from "app/token";

import 'rc-time-picker/assets/index.css';
let localApiUrl2 = _.replace(localApiUrl, "/api", "")
const days = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday"
}
class PageForm extends Component {

    onChange = (value) => {
        console.log(value && value.format('h:mm A'));
    }

    getDayStartTimeInitValue = (i, input) => {
        if (this.props.isEdit) {
            if (this.props.values.store_open_days[i].start) {
                return moment(this.props.values.store_open_days[i].start, "h:mm A")
            }
        }
        return null
    }
    getDayEndTimeInitValue = (i, input) => {
        if (this.props.isEdit) {
            if (this.props.values.store_open_days[i].end) {
                return moment(this.props.values.store_open_days[i].end, "h:mm A")
            }
        }
        return null

    }

    render() {
        return <Form onSubmit={this.props.handleSubmit}>
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader>
                            <strong>{this.props.isEdit ? 'Edit Store' : 'New Store'} </strong>
                        </CardHeader>
                        <CardBody >


                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="store_name">Name</Label>
                                        <Field name="store_name" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_name" placeholder="Name" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="branch">Branch</Label>
                                        <Field name="branch">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="branch" placeholder="Branch" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="description">Description</Label>
                                        <Field name="description" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} id="description" placeholder="Description" {...input} type="textarea" />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="phone_number">Phone</Label>
                                        <Field name="phone_number" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="phone_number" placeholder="Phone" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>

                                    <FormGroup  >
                                        <Label htmlFor="active">Status</Label>

                                        <Field name="active" component="select" className="form-control">
                                            <option value="active">Active</option>
                                            <option value="frozen">Frozen</option>
                                        </Field>
                                    </FormGroup>
                                    <Field name="logo" validate={validate.uploadImageOnly} >
                                        {({ input, meta }) => (
                                            <div>

                                                <FileInputComponent
                                                    labelText=" "
                                                    multiple={false}
                                                    buttonComponent={<Button size="sm" type="button" color="primary"  >Upload Logo</Button>}
                                                    callbackFunction={(file_arr) => { input.onBlur(); input.onChange(file_arr); }}
                                                    inputName="logo"
                                                    accept="image/*"
                                                    defaultFiles={this.props.isEdit ? [localApiUrl2 + this.props.values.logo_url] : []}
                                                />
                                                <Input type="text" style={{ display: "none" }} className={meta.error && meta.touched ? 'is-invalid' : ''} />
                                                {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                            </div>

                                        )}
                                    </Field>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <strong>Address </strong>
                        </CardHeader>
                        <CardBody >
                            <FormGroup>
                                <Label htmlFor="store_addresses.0.name">Name</Label>
                                <Field name="store_addresses.0.name" validate={validate.required}>
                                    {({ input, meta }) => (
                                        <div>
                                            <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.name" placeholder="Enter street name" {...input} />
                                            {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.line1">Line 1</Label>
                                        <Field name="store_addresses.0.line1" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.line1" placeholder="Enter line1" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.line2">Line 2</Label>
                                        <Field name="store_addresses.0.line2">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.line2" placeholder="Enter line2" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.city">City</Label>
                                        <Field name="store_addresses.0.city" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.city" placeholder="Enter city" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.state">State</Label>
                                        <Field name="store_addresses.0.state" validate={validate.required}>
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.state" placeholder="Enter state" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.zip">Zip</Label>
                                        <Field name="store_addresses.0.zip">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.zip" placeholder="Enter zip" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="store_addresses.0.country">Country</Label>
                                        <Field name="store_addresses.0.country">
                                            {({ input, meta }) => (
                                                <div>
                                                    <Input className={meta.error && meta.touched ? 'is-invalid' : ''} type="text" id="store_addresses.0.country" placeholder="Enter country" {...input} />
                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                </div>
                                            )}
                                        </Field>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <strong>Opening Days </strong>
                        </CardHeader>
                        <CardBody >

                            <Table hover striped className="table-align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th width="10%">Day</th>
                                        <th width="10%">Open</th>
                                        <th width="80%">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.times(7, i => {
                                        return <tr key={i}>
                                            <td>
                                                {days[i + 1]}
                                                <Field
                                                    name={`store_open_days.${i}.day`}
                                                    component="input"
                                                    type="hidden"
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    name={`store_open_days.${i}.active`}
                                                    component="input"
                                                    type="checkbox"
                                                >
                                                    {({ input, meta }) => (
                                                        <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={input.checked} onChange={e => input.onChange(e)} />
                                                    )}
                                                </Field>
                                            </td>
                                            <td>
                                                <div className="form-inline" >
                                                    <FormGroup className="pr-3">
                                                        <Label htmlFor={`store_open_days.${i}.start`} className="pr-2">From</Label>
                                                        {this.props.values.store_open_days[i].active ? <Field name={`store_open_days.${i}.start`}
                                                            validate={validate.required}
                                                        >
                                                            {({ input, meta }) => (
                                                                <div>
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        onClose={() => input.onBlur()}
                                                                        onChange={(value) => { input.onBlur(); input.onChange(value ? value.format("h:mm A") : ''); }}
                                                                        className={meta.error && meta.touched ? 'form-control is-invalid' : 'form-control'}
                                                                        use12Hours
                                                                        inputReadOnly
                                                                        format="h:mm A"
                                                                        defaultValue={this.getDayStartTimeInitValue(i)}

                                                                    />
                                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}

                                                                </div>
                                                            )}

                                                        </Field> :
                                                            <input disabled className="form-control" style={{ padding: 0 }} />}
                                                    </FormGroup>
                                                    <FormGroup className="pr-3">
                                                        <Label htmlFor={`store_open_days.${i}.end`} className="pr-2">  To</Label>

                                                        {this.props.values.store_open_days[i].active ? <Field name={`store_open_days.${i}.end`}
                                                            validate={validate.required}

                                                        >
                                                            {({ input, meta }) => (
                                                                <div>
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        onClose={() => input.onBlur()}
                                                                        onChange={(value) => { input.onBlur(); input.onChange(value ? value.format("h:mm A") : ''); }}
                                                                        className={meta.error && meta.touched ? 'form-control is-invalid' : 'form-control'}
                                                                        use12Hours
                                                                        inputReadOnly
                                                                        format="h:mm A"
                                                                        defaultValue={this.getDayEndTimeInitValue(i)}
                                                                    />
                                                                    {meta.error && meta.touched && <div className="invalid-feedback" >{meta.error}</div>}
                                                                </div>

                                                            )}

                                                        </Field> :
                                                            <input disabled className="form-control" style={{ padding: 0 }} />
                                                        }
                                                    </FormGroup>
                                                </div>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </Table>
                        </CardBody>

                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" disabled={this.props.saveInProgress} className="mr-2"><i className="fa fa-check"></i> Save</Button>
                            <Button type="button" size="sm" color="danger" onClick={this.props.goToPages} className="mr-2"><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Form>
    }
}

export default PageForm