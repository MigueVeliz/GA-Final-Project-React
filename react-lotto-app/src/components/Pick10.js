import React, { Component } from 'react'

import GoHome from './GoHome'
import Navigation from './Navigation'


class Pick10 extends Component {

	/* Game information is loaded when
	this component is mounted */
	componentDidMount() {

		let id = this.props.user.id

		fetch( this.props.urlReact + "/pick10/" + id)
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson)

			this.props.getPick10Data(responseJson);
		})
	}//end of componentDidMount\


	// Old Pick 10 numbers are rendered in the page
	displayData() {
		if( this.props.pick10Data.length === 0 ) {
			return (
				<h1 className = "no-data">No Data Available</h1>
			)
		}
		else {
			return this.props.pick10Data.map((el, index) => {
				return (
					<div key = { index } >
						<ul className = "old-pick10-list">
							<li className = "pick10-old-number-styles old-pick10-numbers"> { el.numbers } </li>
							<li className = "pick10-old-number-styles old-days"> { el.days } </li>
						</ul>
						<div onClick = { () => { this.deleteNumbers(el.id) } } 
							className = "pick10-delete-button">
							Delete
						</div>
					</div>
				)
			})
		}
	}//end of displayData

	/*Deletes a row of Quick Draw Numbers 
	  previously saved by the user*/
	deleteNumbers(id) {

		console.log("deleting numbers widh ID:" + id ) 

		this.props.deletePick10Numbers(id)

	    fetch( this.props.urlReact + "/pick10/" + id, {
	        method: 'DELETE',
	        mode: 'CORS',
	    }).then(res => res)

	}//end of deleteNumbers

	chooseNewPick10Numbers() {

		const container = []
		const data = {
			numbers: [],
			days: [1, 2, 3, 4, 5, 6, 7]
		}//end of data

		// filling up array numbers with values
		// from 1 al the way up to 80
		for(let i = 1; i < 81; i++ ) {
			data.numbers.push(i);
		}

		container.push(data.numbers.map((el, index) => {
			return (
				<li
					className = {  
						this.active( this.props.newPick10Numbers, el) ? "pick10-styles pick10-numbers pick10-active" : "pick10-styles pick10-numbers" }
					//className = "pick10-styles pick10-numbers"
					key = { index }
				 	onClick = { this.props.getNewPick10Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.days.map((el, index) => {
			return (
				<li
					className = "pick10-styles pick10-days"
					key = { index }
				 	onClick = { this.props.getNewPick10Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		return container;

	}// end of choooseNewQuickDrawNumbers

	// Return true or false if number is in the 
	// this.state.props.numbers
	active( arr, el ) {	
		return arr.includes( el )
	}

	/*Button that appears when the user has selected 5
	numbers. This botton when clicked, will trigger
	another function that adds the numbers to the DB*/
	submitButton() {
		 if (this.props.newPick10Numbers.length === 11 ) {
			return (
				<div 
					className = "submit-quick-draw-button"
					onClick = { () => { this.parseValues() } }
					//onClick = { () => { this.addNewNumbers() } }
				>
					<p>Add New Pick 10 Numbers</p>
				</div>
			 )
		}
	}

	// Makes sure the values that will be sent to the
	// POST REQUEST are in the same format that the
	// databse expects them
	parseValues() {

		let numbers = this.props.newPick10Numbers

		let numbersString = ""
		let days = numbers.pop()

		numbers.forEach((el) => {
			numbersString += " " + el
		})

		console.log("numbers: " + numbersString)
		console.log("days: " + days)

		// Makes a POST REQUEST
		this.addNewPick10Numbers( numbersString, days)

	}

	/*Adds the NEW QUICK DRAW NUMBERS chosen by the user to the
	datase and they will be render on the Previous Numbers
	section on the bottom*/
	addNewPick10Numbers( numbersString, days ) {
		console.log("Running addNewPick10Numbers!")

		let user_id =  this.props.user.id

		fetch( this.props.urlReact + "/pick10", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: user_id,
				numbers: numbersString,
				days: days,
			})
		})
		.then((response) => {
			return response.json()
		})
		.then((body) => {
			console.log(body)
		});

	}



	render() {
		return (
			<div>
          		<Navigation getGameMode = { this.props.getGameMode } logout = { this.props.logout } user = { this.props.user }/>
			
				<GoHome getGameMode = { this.props.getGameMode } />


				<div className = "new-pick10-numbers-container">
					{ this.chooseNewPick10Numbers() }
				</div>

				<div>
					{ this.submitButton() }
				</div>

				<p className = "previous-numbers-text">Your previous Numbers</p>
				<div  className = "old-pick10-container">
					{ this.displayData() }
				</div>

			</div>
		)
	}
}

export default Pick10;