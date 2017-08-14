import React, { Component } from 'react'

class Navigation extends Component {
	render() {
		return (
			<div className = "navigation">
				<p className = "title">NYC Plays</p>
     			<button className = "logout-button" onClick={this.props.logout}>Log Out</button>
     			<button className = "home-button" onClick={ this.props.getGameMode }>Home</button>
			</div>
		)
	}
}

export default Navigation;