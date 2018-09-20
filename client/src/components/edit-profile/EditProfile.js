import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            sport: '',
            skills: '',
            skilllevel: '',
            bio: '',
            website: '',
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

    // lifecycle method on component mounts/ initialize
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    // lifecycle method
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // bring skills array back to comma separated value
            const skillsCSV = profile.skills.join(',');

            // if profile field does not exist, make empty string
            profile.location = !isEmpty(profile.location)
                ? profile.company
                : '';

            profile.sport = !isEmpty(profile.sport) ? profile.sport : '';
            profile.skilllevel = !isEmpty(profile.skilllevel)
                ? profile.skilllevel
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            // social is an opject not string
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.website = !isEmpty(profile.social.website)
                ? profile.social.website
                : '';
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            // set component fields state
            this.setState({
                handle: profile.handle,
                location: profile.location,
                sport: profile.sport,
                skills: skillsCSV,
                skilllevel: profile.skilllevel,
                bio: profile.bio,
                website: profile.website,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            sport: this.state.sport,
            skills: this.state.skills,
            skilllevel: this.state.skilllevel,
            bio: this.state.bio,
            website: this.state.website,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, displaySocialInputs } = this.state; // destructure from this.state

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Website URL"
                        name="website"
                        icon="fab fa-chrome"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

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
                                Edit Profile
                            </h1>
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
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // toggles state on button click
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">
                                        {' '}
                                        Optional
                                    </span>
                                </div>
                                {socialInputs}
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
