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
        // same as
        // const errors = this.state.errors
        const { errors } = this.state;

        return (
            <div className="add-meets">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add meets</h1>
                            <p className="lead text-center">
                                Add any meets or competitions that you've
                                participated in.
                            </p>
                            <div className="d-block pb-3">
                                * = requred fields
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddMeets.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddMeets));
