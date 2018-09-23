import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMeets } from '../../actions/profileActions';

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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const meetData = {
            title: this.state.title,
            federation: this.state.federation,
            location: this.state.location,
            datestart: this.state.datestart,
            dateend: this.state.dateend,
            description: this.state.description,
            awards: this.state.awards
        };

        this.props.addMeets(meetData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                            <small className="d-block pb-3">
                                * = requred fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="* Federation"
                                    name="federation"
                                    value={this.state.federation}
                                    onChange={this.onChange}
                                    error={errors.federation}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>Date Start</h6>
                                <TextFieldGroup
                                    name="datestart"
                                    type="date"
                                    value={this.state.datestart}
                                    onChange={this.onChange}
                                    error={errors.datestart}
                                />
                                <h6>Date End</h6>
                                <TextFieldGroup
                                    name="dateend"
                                    type="date"
                                    value={this.state.dateend}
                                    onChange={this.onChange}
                                    error={errors.dateend}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the this meet/ competition."
                                />
                                <TextFieldGroup
                                    placeholder="Awards"
                                    name="awards"
                                    value={this.state.awards}
                                    onChange={this.onChange}
                                    error={errors.awards}
                                />
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddMeets.propTypes = {
    addMeets: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addMeets }
)(withRouter(AddMeets));
