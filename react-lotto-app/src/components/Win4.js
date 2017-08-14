import React, { Component } from 'react'

import GoHome from './GoHome'
import Navigation from './Navigation'


class Win4 extends Component {

	/* Game information is loaded when
	this component is mounted */
	componentDidMount() {
		
		let id = this.props.user.id

		fetch( this.props.urlReact + "/win4/" + id)
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson)

			responseJson.reverse()

			this.props.getWin4Data(responseJson);
		})
	}
	//end of componentDidMount

	// Old Pick 10 numbers are rendered in the page
	displayData() {
		if( this.props.win4Data.length === 0 ) {
			return (
				<h1 className = "no-data">No Data Available</h1>
			)
		}
		else{
			return this.props.win4Data.map((el, index) => {
				return (
					<div key = { index } >
						<ul className = "old-win4-list">
							<li className = "win4-old-number-styles old-digits"> { el.first_digit } </li>
							<li className = "win4-old-number-styles old-digits"> { el.second_digit } </li>
							<li className = "win4-old-number-styles old-digits"> { el.third_digit } </li>
							<li className = "win4-old-number-styles old-digits"> { el.fourth_digit } </li>
							<li className = "win4-old-number-styles old-wager_type"> { el.wager_type } </li>
							<li className = "win4-old-number-styles old-amount-per-wager"> { el.amount_per_wager } </li>
							<li className = "win4-old-number-styles old-draw-time"> { el.draw_time } </li>
							<li className = "win4-old-number-styles old-number-of-tickets"> { el.number_of_tickets } </li>
							<li className = "win4-old-number-styles old-number-of-days"> { el.number_of_days } </li>
						</ul>
						<div onClick = { () => { this.deleteNumbers(el.id) } } 
							className = "win4-delete-button">
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

		this.props.deleteWin4Numbers(id)

		console.log("deleting numbers widh ID:" + id ) 

	    fetch( this.props.urlReact + "/win4/" + id, {
	        method: 'DELETE',
	        mode: 'CORS',
	    }).then(res => res)

	}//end of deleteNumbers


	chooseNewWin4Numbers() {

		const container = []
		const data = {
			first_digit: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			second_digit: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			third_digit: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			fourth_digit: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			wager_type: ["str", "box", "comb"],
			amount_per_wager: [0.5, 1.00],
			draw_time: ["day", "eve", "both"],
			number_of_tickets: [ 2, 3, 4, 5, 6, 7, 8, 9, 10],
			number_of_days: [ 2, 3, 4, 5, 6, 7]
		}//end of data


		container.push(data.first_digit.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[0], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-first-digit" }
					//className = "win4-styles win4-firts-digit"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.second_digit.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[1], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-first-digit" }
					//className = "win4-styles win4-second-digit"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.third_digit.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[2], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-first-digit" }
					//className = {  this.active( this.props.newPick10Numbers, el) ? "pick10-styles pick10-numbers pick10-active" : "pick10-styles pick10-numbers" }
					//className = "win4-styles win4-third-digit"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.fourth_digit.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[3], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-first-digit" }
					//className = {  this.active( this.props.newPick10Numbers, el) ? "pick10-styles pick10-numbers pick10-active" : "pick10-styles pick10-numbers" }
					//className = "win4-styles win4-fourth-digit"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.wager_type.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[4], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-wager-type" }
					//className = "win4-styles win4-wager-type"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.amount_per_wager.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[5], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-amount-per-wager" }
					//className = "win4-styles win4-amount-per-wager"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.draw_time.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[6], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-draw-time" }
					//className = "win4-styles win4-draw-time"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.number_of_tickets.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[7], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-number-of-tickets" }
					//className = "win4-styles win4-number-of-tickets"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		container.push(data.number_of_days.map((el, index) => {
			return (
				<li
					className = {  this.active( this.props.newWin4Numbers[8], el) ? "win4-styles win4-first-digit win4-active" : "win4-styles win4-number-of-days" }
					//className = "win4-styles win4-number-of-days"
					key = { index }
				 	onClick = { this.props.getNewWin4Numbers.bind(el) }
				> { el } </li>
				)
			})
		)

		return container;

	}// end of choooseNewQuickDrawNumbers


	// Return true or false if number is in the 
	// this.state.props.numbers
	active( arr, el ) {	
		let arr2 = []
		arr2.push(arr)
		return arr2.includes( el )
	}

	/*Button that appears when the user has selected 5
	numbers. This botton when clicked, will trigger
	another function that adds the numbers to the DB*/
	submitButton() {
		 if (this.props.newWin4Numbers.length === 9 ) {
			return (
				<div 
					className = "submit-quick-draw-button"
					//onClick = { () => { this.parseValues() } }
					onClick = { () => { this.addNewWin4Numbers() } }
				>
					<p>Add New Pick 10 Numbers</p>
				</div>
			 )
		}
	}

	/*Adds the NEW WIN 4 NUMBERS chosen by the user to the
	datase and they will be render on the Previous Numbers
	section on the bottom*/
	addNewWin4Numbers() {
		console.log("Running addNewWin4Numbers!")

		let data = this.props.newWin4Numbers
		let user_id =  this.props.user.id


		fetch( this.props.urlReact + "/win4" , {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				first_digit: data[0],
				second_digit: data[1],
				third_digit: data[2],
				fourth_digit: data[3],
				wager_type: data[4],
				amount_per_wager: data[5],
				draw_time: data[6],
				number_of_tickets: data[7],
				number_of_days: data[8],
				user_id: user_id
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

				<div className = "new-win4-numbers-container">
					{ this.chooseNewWin4Numbers() }
				</div>

				<div>
					{ this.submitButton() }
				</div>


				<p className = "previous-numbers-text">Your previous Numbers</p>
				<div  className = "old-win4-container">
					{ this.displayData() }
				</div>

			</div>
		)
	}
}

export default Win4;