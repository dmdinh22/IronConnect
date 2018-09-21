import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextFieldGroup } from '../common/TextFieldGroup';
import { TextAreaFieldGroup } from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddMeets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            federation: '',
            location: '',
            datestart: '',
            dateend: '',
            description: '',
            awards: '',
            errors: {},
            disabled: false
        };
    }
    render() {
        return <div />;
    }
}

export default AddMeets;
