import React, { Component } from 'react';
import { connect } from "react-redux"
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Form as ReactForm } from 'react-final-form'
import Actions from "./actions" 
import { Redirect } from 'react-router-dom';
import PageForm from "./Form"
import Preview from "./Preview"


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { requestSave, resetForm, previewPageContent } = Actions

class PagesAddForm extends Component {

    componentWillUnmount() {
        this.props.resetForm()
    }
    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    onSubmit = (values) => {
        this.props.requestSave({
            ...values,
            contents: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
    }

    goToPages = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            this.props.pages.saveSuccess ? <Redirect to="/pages" /> :
                <div className="animated fadeIn">
                    <Preview />

                    <ReactForm
                        onSubmit={this.onSubmit}
                        render={({ handleSubmit }) => (

                            <PageForm
                                isEdit={false}
                                onEditorStateChange={this.onEditorStateChange}
                                editorState={this.state.editorState}
                                saveInProgress={this.props.pages.saveInProgress}
                                goToPages={this.goToPages}
                                handleSubmit={handleSubmit}
                                previewPageContent={() => this.props.previewPageContent(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))}

                            />
                        )}
                    />
                </div>

        );
    }
}
export default connect(state => ({
    pages: state.pages
}), { requestSave, resetForm, previewPageContent })(PagesAddForm)