import React, { Component } from 'react';
import { connect } from "react-redux"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Form as ReactForm } from 'react-final-form'
import Actions from "./actions"
import Preview from "./Preview"


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PageForm from "./Form"

class PagesAddForm extends Component {

    componentWillUnmount() {
        this.props.resetForm()
    }
    componentWillMount() {
        this.props.requestData(this.props.match.params.id)
    }

    componentDidUpdate(prev) {
        if (!prev.pages.edit && this.props.pages.edit) {
            const html = this.props.pages.edit.contents;
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState,
                });
            }
        }
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
        }, this.props.match.params.id)
    }

    goToPages = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Preview />

                {this.props.pages.edit ? <ReactForm
                    onSubmit={this.onSubmit}
                    initialValues={this.props.pages.edit}
                    render={({ handleSubmit }) => (

                        <PageForm
                            isEdit={true}
                            onEditorStateChange={this.onEditorStateChange}
                            editorState={this.state.editorState}
                            saveInProgress={this.props.pages.saveInProgress}
                            goToPages={this.goToPages}
                            handleSubmit={handleSubmit}
                            previewPageContent={() => {
                                console.log('heeeee')
                                console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
                                this.props.previewPageContent(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))

                            }}

                        />
                    )}
                /> : <div className="animated fadeIn pt-1 text-center">Loading...</div>}
            </div>

        );
    }
}
export default connect(state => ({
    pages: state.pages
}), { ...Actions })(PagesAddForm)