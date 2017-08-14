import React, { Component } from 'react'

class GoHome extends Component {


	render() {

		return (
			<div onClick = { this.props.getGameMode.bind(this) } >
				<h2 className = "go-home">HOME</h2>
			</div>

		)
	}
}

export default GoHome;