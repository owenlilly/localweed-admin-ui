import React, { Component } from 'react';
import { connect } from "react-redux"
import { Form as ReactForm } from 'react-final-form'
import Actions from "./actions"


import _ from "lodash"
import moment from "moment"
import Form from "./Form"

class PagesAddForm extends Component {


    componentWillMount() {
        this.props.requestData(this.props.match.params.id)
    }

    onSubmit = (values) => {
        if (_.has(values, "logo")) {

            values = {
                ...values,
                logo: values.logo.base64
            }
        }
        this.props.requestSave(values, this.props.match.params.id)
    }

    goToPages = () => {
        this.props.history.goBack();
    }

    render() {
        let values = {}
        if (this.props.stores.edit) {
            values = {
                ...this.props.stores.edit,
                store_name: this.props.stores.edit.name
            }
        }
        return (
            <div className="animated fadeIn">

                {this.props.stores.edit ? <ReactForm
                    onSubmit={this.onSubmit}
                    initialValues={values}
                    validate={values => {
                        let errors = {
                            store_open_days: []
                        }
                        _.map(values.store_open_days, (day, i) => {
                            if (day.active) {
                                if (day.start && day.end) {
                                    if (moment(day.start, "h:mm A") >= moment(day.end, "h:mm A")) {
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
                            isEdit={true}
                            saveInProgress={this.props.stores.saveInProgress}
                            goToPages={this.goToPages}
                            handleSubmit={handleSubmit}
                            values={values}
                        />
                    )}
                /> : <div className="animated fadeIn pt-1 text-center">Loading...</div>}
            </div>

        );
    }
}
export default connect(state => ({
    stores: state.stores
}), { ...Actions })(PagesAddForm)