import React from "react"
import { getLoginToken } from "./token"
import {Login} from "../views/index"
class AppContainer extends React.Component {
    componentDidMount() {
        if (getLoginToken()) {
            // get login user data
            this.props.requestLoginUserData()
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user.isLogin && this.props.user.isLogin) {
            this.props.requestLoginUserData();
        }
    }

    render() {
        return getLoginToken() ?
            (this.props.user.data ? <Layout /> : <div><h3>Loading...</h3></div>) :
            (<Login />)
    }

}

export default connect((state) => ({
    windows: state.tabs.windows,
}), {
    requestLoginUserData,
})(AppContainer);
