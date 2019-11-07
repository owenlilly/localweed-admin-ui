import React, { Component } from "react"
import { connect } from "react-redux"
import Actions from "./actions"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const {cancelPreviewPageContent} = Actions
class PreviewConatiner extends Component {
    render() {
        return <Modal isOpen={this.props.previewContent ? true : false}
            toggle={() => this.props.cancelPreviewPageContent()}
            className={'modal-lg '}>
            <ModalHeader toggle={this.toggleLarge}>Preview</ModalHeader>
            <ModalBody>
                <div dangerouslySetInnerHTML={{ __html: this.props.previewContent }}></div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.cancelPreviewPageContent()}>Close</Button>
            </ModalFooter>
        </Modal>
    }
}

export default connect(state => ({
    previewContent: state.pages.previewContent
}), { cancelPreviewPageContent} )(PreviewConatiner)