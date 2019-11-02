import React, { Component } from "react"
import { connect } from "react-redux"
import { UncontrolledTooltip, Card, CardBody, CardHeader, Col, Row, Table, Button, ButtonGroup, Badge, Pagination, PaginationItem, PaginationLink, FormGroup, Input, Label } from 'reactstrap';
import { requestPageList, requestPageDelete, previewPageContent } from "./actions"
import _ from "lodash"
import { Link } from "react-router-dom"
import notifications from "app/notification";
import queryString from 'query-string';
import Preview from "./Preview"
class PagesList extends Component {
    pageeQueryString = ''
    componentWillMount() {
        this.pageeQueryString = queryString.parse(this.props.location.search)
        this.props.requestPageList(this.pageeQueryString)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.props.requestPageList(queryString.parse(this.props.location.search))
        }
    }
    goToPage = page => {
        this.pageeQueryString = {
            ...this.pageeQueryString,
            page
        }
        this.updateUrl()
    }
    changeLimit = limit => {
        this.pageeQueryString = {
            limit,
            page: 1
        }
        this.updateUrl()
    }
    updateUrl = () => {
        this.props.history.push(`/pages?${queryString.stringify(this.pageeQueryString)}`)
    }
    render() {
        const { list } = this.props.pages
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
                                    {list && _.map(list.records, (page, k) => <tr key={k}>
                                        <td><Link to={"/pages/edit/" + page.id}> {page.title}</Link></td>
                                        <td>{page.slug}</td>
                                        <td>{page.status ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge>}</td>
                                        <td style={{ textAlign: "right" }}>
                                            <ButtonGroup>

                                                <Button className="mr-2"
                                                    id={'UncontrolledTooltipEdit-' + page.id}
                                                    onClick={() => this.props.history.push("/pages/edit/" + page.id)}>
                                                    <i className="cui-pencil icons  "></i></Button>
                                                <UncontrolledTooltip placement="top" target={'UncontrolledTooltipEdit-' + page.id} >
                                                    Edit
                                                </UncontrolledTooltip>

                                                <Button className="mr-2"
                                                    id={'UncontrolledTooltipDelete-' + page.id}

                                                    onClick={
                                                        () => {
                                                            notifications.confirm('Are you sure ?', () => {
                                                                this.props.requestPageDelete(page.id)
                                                            })
                                                        }
                                                    }>
                                                    <i className="cui-trash icons "></i>
                                                </Button>
                                                <UncontrolledTooltip placement="top" target={'UncontrolledTooltipDelete-' + page.id} >
                                                    Delete
                                                </UncontrolledTooltip>


                                                <Button
                                                    id={'UncontrolledTooltipPreview-' + page.id}

                                                    onClick={
                                                        () => {
                                                            this.props.previewPageContent(page.contents)
                                                        }
                                                    }>
                                                    <i className="icon-eye icons "></i>
                                                </Button>
                                                <UncontrolledTooltip placement="top" target={'UncontrolledTooltipPreview-' + page.id} >
                                                    View
                                                </UncontrolledTooltip>
                                            </ButtonGroup>
                                        </td>
                                    </tr>)
                                    }
                                </tbody>
                            </Table>
                            {list &&
                                <Row>
                                    <Col xs="8">
                                        <Pagination>
                                            {list.page > 1 && <PaginationItem>
                                                <PaginationLink previous tag="button" onClick={() => this.goToPage(list.page - 1)}></PaginationLink>
                                            </PaginationItem>}

                                            {_.times(list.total_page, (p) => (
                                                <PaginationItem active={p + 1 === list.page} key={p} onClick={() => this.goToPage(p + 1)}>
                                                    <PaginationLink tag="button">{p + 1}</PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            {list.page < list.total_page && <PaginationItem>
                                                <PaginationLink next tag="button" onClick={() => this.goToPage(list.page + 1)}></PaginationLink>
                                            </PaginationItem>}

                                        </Pagination>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup row>
                                            <Col xs="6" md="6" style={{ textAlign: "right" }}>
                                                <Label htmlFor="select">Record Per Page</Label>
                                            </Col>
                                            <Col xs="6" md="6">
                                                <Input type="select" name="select" id="select" value={list.limit}
                                                    onChange={(e) => this.changeLimit(e.target.value)}
                                                >
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
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
}), { requestPageList, requestPageDelete, previewPageContent })(PagesList)