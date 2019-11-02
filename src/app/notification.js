import {toastr} from 'react-redux-toastr'

export default {
    notifySuccess: (title, msg) => toastr.success(title, msg),
    notifyError: (title, msg) => toastr.error(title, msg),
    notifyWarning: (title, msg) => toastr.warning(title, msg),
    confirm: (msg, onOk, onCancel = () => {
    }) => {
        const toastrConfirmOptions = {
            onOk: onOk,
            onCancel: onCancel
        };
        toastr.confirm(msg, toastrConfirmOptions);
    }
}

