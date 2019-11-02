import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, CardBody, CardHeader, Col, Row, Table, Button, ButtonGroup, Badge } from 'reactstrap';
import { requestPageList, requestPageDelete } from "./actions"
import _ from "lodash"
import { Link } from "react-router-dom"
import notifications from "app/notification";

class PagesList extends Component {
    componentDidMount() {
        this.props.requestPageList()
    }
    render() {
        return <div className="animated fadeIn">
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
                            {this.props.pages.requestList ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                                <Table hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Slug</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: "right" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.map(this.props.pages.list, (page,k) => <tr key={k}>
                                            <td><Link to={"/pages/edit/" + page.id}> {page.title}</Link></td>
                                            <td>{page.slug}</td>
                                            <td>{page.status ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge>}</td>
                                            <td style={{ textAlign: "right" }}>
                                                <ButtonGroup>

                                                    <Button className="mr-2"
                                                        onClick={() => this.props.history.push("/pages/edit/" + page.id)}>
                                                        <i className="cui-pencil icons  mt-4"></i></Button>


                                                    <Button
                                                        onClick={() => {
                                                            notifications.confirm('Are you sure ?', () => {
                                                                this.props.requestPageDelete(page.id)
                                                            })

                                                        }
                                                        }
                                                    >  <i className="cui-trash icons  mt-4"></i></Button>

                                                </ButtonGroup>
                                            </td>
                                        </tr>)
                                        }
                                    </tbody>
                                </Table>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >

    }
}
export default connect(state => ({
    pages: state.pages,
}), { requestPageList, requestPageDelete })(PagesList)