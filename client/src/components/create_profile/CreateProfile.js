import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

export default class CreateProfile extends Component {

  constructor() {
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
  }

  render() {
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
          </div>
        </div>
      </div>
        
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(null)(CreateProfile);