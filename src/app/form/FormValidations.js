import _ from "lodash";

const required = value => (value ? undefined : "This filed is required");
const noValidate = () => undefined;
const maxLength = max => value =>
    value && value.length > max
        ? `This filed maximum length ${max} characters`
        : undefined;

const minLength = min => value =>
    value && value.length < min
        ? `This filed minimum length ${min} characters`
        : undefined;


const number = value =>
    value && isNaN(Number(value)) ? "This filed must be number" : undefined;
const minValue = min => value => {
    if (min) {
        if (_.includes(min, '$')) {
            min = parseFloat(min.replace('$', ''));
        }
        if (_.includes(value, '$')) {
            value = parseFloat(value.replace('$', ''));
        }
        return value && value < min
            ? `This filed minimum value must be more than ${value} `
            : undefined;
    }
    return undefined;
}
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : undefined;

const maxValue = max => value =>
    value && value > max ? `Must be maximm ${max}` : undefined;

const tooOld = value =>
    value && value > 65 ? "You might be too old for this" : undefined;
const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? "Really? You still use AOL for your email?"
        : undefined;
const creditCardNumber = (ccNum) => {
    if (!ccNum) {
        return undefined;
    }
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
        isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
        isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
        isValid = true;
    } else if (discovRegEx.test(ccNum)) {
        isValid = true;
    }

    return !isValid ? "Please provide a valid Visa number!" : undefined;
}
const uploadImageOnly = file => {
    if (file && file.type) {

        return (/\/(gif|jpg|jpeg|tiff|png)$/i).test(file.type) ? undefined : "Upload images only";
    }
    return undefined;
}
export default {
    required,
    maxLength,
    minLength,
    number,
    minValue,
    email,
    maxValue,
    tooOld,
    aol,
    creditCardNumber,
    uploadImageOnly,
    noValidate
};
