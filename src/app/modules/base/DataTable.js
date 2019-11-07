import React, { Component } from "react"
import { UncontrolledTooltip,  Col, Row, Table, Button, ButtonGroup,  Pagination, PaginationItem, PaginationLink, FormGroup, Input, Label } from 'reactstrap';
import _ from "lodash"
import notifications from "app/notification";
import queryString from 'query-string';

export default class DataTable extends Component {
    pageeQueryString = ''
    componentWillMount() {
        this.pageeQueryString = queryString.parse(this.props.location.search)
        let qs = {}
        if (this.props.list) {
            qs = {
                limit: this.props.list.limit,
                page: this.props.list.page,
            }
        }
        this.props.requestList({ qs, ...this.pageeQueryString })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.props.requestList(queryString.parse(this.props.location.search))
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
        this.props.history.push(this.props.baseUrl + `?${queryString.stringify(this.pageeQueryString)}`)
    }
    render() {
        const list = this.props.list
        return <div>
            <Table hover responsive>
                <thead>
                    <tr>
                        {_.map(this.props.headers, (header,k) => <th key={k}>{header}</th>)}

                        {(this.props.actions || this.props.customActions) && <th style={{ textAlign: "right" }}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {list && _.map(list.records, (page, k) => <tr key={k}>
                        {
                            _.map(this.props.columns, (column,k) => <td key={"col"+k}>
                                {_.has(this.props.customeView, column) ? this.props.customeView[column](page) : page[column]}
                            </td>
                            )
                        }

                        {(this.props.actions || this.props.customActions) && <td style={{ textAlign: "right" }}>
                            <ButtonGroup>

                                {_.includes(this.props.actions, 'edit') && <div><Button className="mr-2"
                                    id={'UncontrolledTooltipEdit-' + page.id}
                                    onClick={() => this.props.history.push(this.props.baseUrl + "/edit/" + page.id)}>
                                    <i className="cui-pencil icons  "></i></Button>
                                    <UncontrolledTooltip placement="top" target={'UncontrolledTooltipEdit-' + page.id} >
                                        Edit
                                                </UncontrolledTooltip>
                                </div>}
                                {_.includes(this.props.actions, 'delete') && <div> <Button className="mr-2"
                                    id={'UncontrolledTooltipDelete-' + page.id}

                                    onClick={
                                        () => {
                                            notifications.confirm('Are you sure ?', () => {
                                                this.props.requestDelete({ id: page.id, qs: { limit: list.limit, page: list.page } })
                                            })
                                        }
                                    }>
                                    <i className="cui-trash icons "></i>
                                </Button>
                                </div>}

                                {this.props.customActions && _.map(this.props.customActions, customAction =>  customAction(page) )}

                            </ButtonGroup>
                        </td>}
                    </tr>)
                    }
                </tbody>
            </Table>
            {
                list &&
                <Row>
                    <Col xs="8">
                        {list.total_page > 1 && <Pagination>
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
                        }
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
        </div >

    }
}