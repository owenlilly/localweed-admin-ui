import React, { Component } from "react"
import { connect } from "react-redux"
import { UncontrolledTooltip, Card, CardBody, CardHeader, Col, Row, Button, Badge } from 'reactstrap';
import Actions from "./actions"
import { Link } from "react-router-dom"
import Preview from "./Preview"

import DataTable from "../base/DataTable"
const { requestList, requestDelete, previewPageContent } = Actions
class PagesList extends Component {


    render() {
        return <div className="animated fadeIn">
            <Preview />
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Pages
                            <div className="card-header-actions">
                                <Button block color="primary" onClick={() => this.props.history.push('/pages/add')} >Add New</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DataTable {...this.props}
                                list={this.props.pages.list}
                                headers={['Title', 'Slug', 'Status']}
                                columns={['title', 'slug', 'status']}
                                customeView={{
                                    'title': row => <Link to={"/pages/edit/" + row.id}> {row.title}</Link>,
                                    'status': row => row.status ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge>,
                                }}
                                actions={['edit', 'delete']}
                                customActions={{
                                    'preview': row => <div>
                                        <Button
                                            id={'UncontrolledTooltipPreview-' + row.id}

                                            onClick={
                                                () => {
                                                    this.props.previewPageContent(row.contents)
                                                }
                                            }>
                                            <i className="icon-eye icons "></i>
                                        </Button>
                                        <UncontrolledTooltip placement="top" target={'UncontrolledTooltipPreview-' + row.id} >
                                            View
                                            </UncontrolledTooltip>
                                    </div>
                                }}
                                baseUrl="/pages"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >

    }
}
export default connect(state => ({
    pages: state.pages,
}), { requestList, requestDelete, previewPageContent })(PagesList)