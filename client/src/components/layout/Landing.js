// rcc shortcut for class component
import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Iron Connector</h1>
								<p className="lead">
									{' '}
									Create a lifter profile, share posts and get help
									from other lifters at Iron Club.
								</p>
								<hr />
								<a href="#" to="/register" className="btn btn-lg btn-info mr-2">
									Sign Up
								</a>
								<a href="#"className="btn btn-lg btn-light">
									Login
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Landing;
