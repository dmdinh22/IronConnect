import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            location: '',
            sport: '',
            skills: '',
            skilllevel: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        // bind click handlers onto component's ctor
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('submitting...');
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state; // destructure from this.state

        // select options for sports
        const options = [
            { label: '* Select your sport', value: 0 },
            { label: 'Body Building', value: 'Body Building' },
            { label: 'Crossfit', value: 'Crossfit' },
            { label: 'Gym Rat', value: 'Gym Rat' },
            { label: 'Powerlifting', value: 'Powerlifting' },
            { label: 'Weightlifting', value: 'Weightlifting' }
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile.
                            </p>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname."
                                />
                                <SelectListGroup
                                    placeholder="Sport"
                                    name="sport"
                                    value={this.state.sport}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.sport}
                                    info="What is your sport?"
                                />
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname."
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City & state suggested (eg. Los Angeles, CA)."
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                    Squat, Bench, Deadlift, Clean, Snatch."
                                />
                                <TextFieldGroup
                                    placeholder="* Skill Level"
                                    name="skillevel"
                                    value={this.state.skillevel}
                                    onChange={this.onChange}
                                    error={errors.skillevel}
                                    info="Rate your skill level as novice, intermediate, advanced, or expert."
                                />
                                <TextAreaFieldGroup
                                    placeholder="Summary about yourself"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself."
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
