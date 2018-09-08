import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
    //component lifecycle method
    componentDidMount() {
        // calling ajax (action)
        this.props.getCurrentProfile();
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default connect(
    null,
    { getCurrentProfile }
)(Dashboard);
