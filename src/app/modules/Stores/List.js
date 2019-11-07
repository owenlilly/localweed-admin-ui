import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, CardBody, CardHeader, Col, Row, Button ,Badge} from 'reactstrap';
import Actions from "./actions"

import DataTable from "../base/DataTable"
const { requestList, requestDelete, previewPageContent } = Actions
class PagesList extends Component {


    render() {
        return <div className="animated fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Pages
                            <div className="card-header-actions">
                                <Button block color="primary" onClick={() => this.props.history.push('/stores/add')} >Add New</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DataTable {...this.props}
                                list={this.props.stores.list}
                                headers={['Name', 'Status', 'Branch', 'Description']}
                                columns={['name', 'status', 'branch', 'description']}
                                actions={['edit', 'delete']}
                                baseUrl="/stores"
                                customeView={{
                                    'status': row => row.status ==='active' ? <Badge color="success">Active</Badge> : <Badge color="secondary">Frozen</Badge>,
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >

    }
}
export default connect(state => ({
    stores: state.stores,
}), { requestList, requestDelete, previewPageContent })(PagesList)