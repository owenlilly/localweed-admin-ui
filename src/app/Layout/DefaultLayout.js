import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import { requestLoginUserData } from "app/AuthUser/actions"
import ReduxToastr from 'react-redux-toastr'

import { getLoginToken } from "app/token"

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
    componentDidMount() {
        if (getLoginToken()) {
            // get login user data
            this.props.requestLoginUserData()
        } else {
            this.props.history.push('/login')
        }
    }

    componentDidUpdate() {
        if (this.props.authUser.loginDataRequested && !this.props.authUser.data) {
            //this mean try login and failed so go to login page
            this.props.history.push('/login')
        }
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        return (
            this.props.authUser.data ? <div className="app">
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    closeOnToastrClick />
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader onLogout={e => this.signOut(e)} />
                    </Suspense>
                </AppHeader>
                <div className="app-body">

                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">

                        <AppBreadcrumb appRoutes={routes} router={router} />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <Suspense fallback={this.loading()}>
                            <DefaultAside />
                        </Suspense>
                    </AppAside>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div> : <Suspense fallback={this.loading()}></Suspense>
        )
    }
}

export default connect(state => ({
    basic: state.basic,
    authUser: state.authUser,
}), { requestLoginUserData })(DefaultLayout)
// export default DefaultLayout;
