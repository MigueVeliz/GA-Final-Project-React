import React, { Component } from 'react'

class Take5LatestWinningNumbers extends Component {

	getLatestWinningNumbers() {
		
		let winning_numbers = 0;

		fetch( "https://data.ny.gov/resource/hh4x-xmbw.json?draw_date=2017-08-13")
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson[0].draw_date)
			console.log(responseJson[0].winning_numbers)

			winning_numbers = responseJson[0].winning_numbers

			// this.props.getTake5Data(responseJson);
		})

		return winning_numbers
	}

	render() {
		return (
			<div className = "Take5LatestWinningNumbers">
				Numbers: { this.getLatestWinningNumbers() } 
			</div>
		) 
	}
}

export default Take5LatestWinningNumbers;