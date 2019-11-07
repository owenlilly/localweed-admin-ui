import React, { Component } from 'react';
import { connect } from "react-redux"
import { Form as ReactForm } from 'react-final-form'
import Actions from "./actions"
import { Redirect } from 'react-router-dom';
import Form from "./Form"
import _ from "lodash"
import moment from "moment"
const { requestSave, resetForm, previewPageContent } = Actions

class PagesAddForm extends Component {


    onSubmit = (values) => {
        if (_.has(values, "logo")) {

            values = {
                ...values,
                logo: values.logo.base64
            }
        }
        this.props.requestSave(values)
    }

    goToPages = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            this.props.stores.saveSuccess ? <Redirect to="/stores" /> :
                <div className="animated fadeIn">

                    <ReactForm
                        onSubmit={this.onSubmit}
                        initialValues={{
                            store_open_days: [
                                { day: 1, active: false },
                                { day: 2, active: false },
                                { day: 3, active: false },
                                { day: 4, active: false },
                                { day: 5, active: false },
                                { day: 6, active: false },
                                { day: 7, active: false },
                            ]
                        }}
                        validate={values => {
                            let errors = {
                                store_open_days: []
                            }
                            _.map(values.store_open_days, (day, i) => {
                                if (day.active) {
                                    if (day.start && day.end) {
                                        if (moment(day.start, "h:mm a") >= moment(day.end, "h:mm a")) {
                                            // error in to must be > start
                                            errors.store_open_days[i] = {
                                                end: 'To time must be after from time'
                                            }
                                        }
                                    }
                                }
                            })
                            return errors
                        }}
                        render={({ handleSubmit, values }) => (
                            <Form
                                isEdit={false}
                                saveInProgress={this.props.stores.saveInProgress}
                                goToPages={this.goToPages}
                                handleSubmit={handleSubmit}
                                values={values}

                            />


                        )}
                    />
                </div>

        );
    }
}
export default connect(state => ({
    stores: state.stores
}), { requestSave, resetForm, previewPageContent })(PagesAddForm)