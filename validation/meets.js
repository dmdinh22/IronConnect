const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMeetsInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.federation = !isEmpty(data.federation) ? data.federation : '';
    data.datestart = !isEmpty(data.datestart) ? data.datestart : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (Validator.isEmpty(data.federation)) {
        errors.federation = 'Federation field is required';
    }

    if (Validator.isEmpty(data.datestart)) {
        errors.datestart = 'Date start field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};