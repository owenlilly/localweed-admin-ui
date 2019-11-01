import React from "react"
import { Form, Field } from 'react-final-form'
const onSubmit = (v1) => console.log(v1)
const required = value => (value ? undefined : 'Required')
const Input = ({ input, meta, label }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type="text" placeholder="First Name" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
    </div>
)
export default () => (
    <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <h2>Simple Default Input</h2>
                <Field name="firstName" component={Input} label="First" placeholder="First Name" validate={required} />

                <h2>An Arbitrary Reusable Input Component</h2>
                <div>
                    <label>Interests</label>
                    {/* <Field name="interests" component={InterestPicker} /> */}
                </div>

                <h2>Render Function</h2>
                <Field
                    name="bio"
                    render={({ input, meta }) => (
                        <div>
                            <label>Bio</label>
                            <textarea {...input} />
                            {meta.touched && meta.error && <span>{meta.error}</span>}
                        </div>
                    )}
                />

                <h2>Render Function as Children</h2>
                <Field name="phone">
                    {({ input, meta }) => (
                        <div>
                            <label>Phone</label>
                            <input type="text" {...input} placeholder="Phone" />
                            {meta.touched && meta.error && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <button type="submit">Submit</button>
            </form>
        )}
    />
)