import React, { Component } from 'react'

// import GoHome from './GoHome'
import Navigation from './Navigation'


class QuickDraw extends Component {

	/* Game information is loaded when
	this component is mounted */
	componentDidMount() {

		let id = this.props.user.id

		fetch( this.props.urlReact + "/quick_draw/" + id)
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson)

			this.props.getQuickDrawData(responseJson);
		})
	}//end of componentDidMount\

	// Old QuickDraw numbers are rendered in the page
	displayData() {
		if( this.props.quickDrawData.length === 0 ) {
			return (
				<h1 className = "no-data">No Data Available</h1>
			)
		}
		else {
			return this.props.quickDrawData.map((el, index) => {
				return (
					<div key = { index } >
						<ul className = "old-quick-draw-list">
							<li className = "quick-draw-old-number-styles old-spots"> { el.spots } </li>
							<li className = "quick-draw-old-number-styles quick-draw-numbers old-numbers"> { el.numbers } </li>
							<li className = "quick-draw-old-number-styles old-how-much-per-game"> { el.how_much_per_draw } </li>
							<li className = "quick-draw-old-number-styles old-quick-draw-extra"> { el.quick_draw_extra } </li>
							<li className = "quick-draw-old-number-styles old-consecutive-number"> { el.consecutive_draws } </li>
						</ul>
						<div onClick = { () => { this.deleteNumbers(el.id) } } 
							className = "quick-draw-delete-button">
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

		this.props.deleteQuickDrawNumbers(id)

	    fetch( this.props.urlReact + "/quick_draw/" + id, {
	        method: 'DELETE',
	        mode: 'CORS',
	    }).then(res => res)

	}//end of deleteNumbers

	chooseNewQuickDrawNumbers() {

		const container = []
		const data = {
			spots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			numbers: [],
			howMuchPerDraw: [1, 2, 3, 4, 5, 10],
			quickDrawExtra: ["yes", "no"],
			consecutiveDraws: [1, 2, 3, 4, 5, 10, 20]
		}//end of data

		// filling up array numbers with values
		// from 1 al the way up to 80
		for(let i = 1; i < 81; i++ ) {
			data.numbers.push(i);
		}

		container.push(data.spots.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newQuickDrawNumbers[0], el) ? "win4-styles win4-first-digit win4-active" : "quick-draw-styles spots" }
					key = { index }
				 	onClick = { this.props.getNewQuickDrawNumbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.numbers.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newQuickDrawNumbers[2], el) ? "win4-styles win4-first-digit win4-active" :  "quick-draw-styles q-draw-numbers" }
					key = { index }
				 	onClick = { this.props.getNewQuickDrawNumbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.howMuchPerDraw.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newQuickDrawNumbers[3], el) ? "win4-styles win4-first-digit win4-active" :  "quick-draw-styles how-much-per-draw" }
					key = { index }
				 	onClick = { this.props.getNewQuickDrawNumbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.quickDrawExtra.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newQuickDrawNumbers[4], el) ? "win4-styles win4-first-digit win4-active" :  "quick-draw-styles quick-draw-extra" }
					key = { index }
				 	onClick = { this.props.getNewQuickDrawNumbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.consecutiveDraws.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newQuickDrawNumbers[5], el) ? "win4-styles win4-first-digit win4-active" :  "quick-draw-styles consecutive-draws" }
					key = { index }
				 	onClick = { this.props.getNewQuickDrawNumbers.bind(el) }
				> { el } </li>
				)
			})
		)

		return container;

	}// end of choooseNewQuickDrawNumbers


	active( arr, el ) {	
		let arr2 = []
		arr2.push(arr)
		return arr2.includes( el )
	}


	/*Button that appears when the user has selected 5
	numbers. This botton when clicked, will trigger
	another function that adds the numbers to the DB*/
	submitButton() {
		// if (this.props.newNumbers.length === 8 ) {
			return (
				<div 
					className = "submit-quick-draw-button"
					onClick = { () => { this.parseValues() } }
					//onClick = { () => { this.addNewNumbers() } }
				>
					<p>Add New QuickDraw Numbers</p>
				</div>
			 )
		//}
	}

	// Makes sure the values that will be sent to the
	// POST REQUEST are in the same format that the
	// databse expects them
	parseValues() {

		// array of values after the user has successfully
		// click al require numbers
		let values = this.props.newQuickDrawNumbers
		let numbersString = ""

		let spots = values.shift()

		let numbers = []
		let howMuchPerDraw = 0
		let quickDrawExtra = "no"
		let consecutiveDraws = 0

		// Getting total of numbers determine by
		// spots
		for(let i = 0; i < spots; i++){
			numbers.push( values.shift() )
		}

		/*numbers.map((el, index) => {
			return numbersString += " " + el
		})*/

		numbers.forEach((el) => {
			numbersString += " " + el
		})

		howMuchPerDraw = values.shift()
		quickDrawExtra = values.shift()
		consecutiveDraws = values.shift()

		console.log("spots: " + spots)
		console.log("numbers: " + numbersString)
		console.log("howMuchPerDraw: " + howMuchPerDraw)
		console.log("quickDrawExtra: " + quickDrawExtra)
		console.log("consecutiveDraws: " + consecutiveDraws)

		// Makes a POST REQUEST
		this.addNewQuickDrawNumbers( spots, numbersString, howMuchPerDraw, quickDrawExtra, consecutiveDraws)

	}

	/*Adds the NEW QUICK DRAW NUMBERS chosen by the user to the
	datase and they will be render on the Previous Numbers
	section on the bottom*/
	addNewQuickDrawNumbers( spots, numbersString, howMuchPerDraw, quickDrawExtra, consecutiveDraws ) {
		console.log("Running addNewQuickDrawNumbers!")

		let user_id =  this.props.user.id

		fetch( this.props.urlReact + "/quick_draw", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: user_id,
				spots: spots,
				numbers: numbersString,
				how_much_per_draw: howMuchPerDraw,
				quick_draw_extra: quickDrawExtra,
				consecutive_draws: consecutiveDraws,
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
			
				<div className = "instructions instructions-quick-draw spots-instrctions">Spots</div>
				<div className = "instructions numbers-chosen">Numbers Selected</div>
				<div className = "instructions how-much-per-draw-instructions">How Much Per Draw</div>
				<div className = "instructions quick-draw-extra-instructions">Quick Draw Extra</div>
				<div className = "instructions consecutive-draws-instructions">Consecutive Draws</div>

				<div className = "new-quick-draw-numbers">
					{ this.chooseNewQuickDrawNumbers() }
				</div>

				<div>
					{ this.submitButton() }
				</div>

				<p className = "previous-numbers-text">Your previous Numbers</p>
				<div  className = "old-quick-draw-container">
					{ this.displayData() }
				</div>

			</div>
		)
	}
}

export default QuickDraw;