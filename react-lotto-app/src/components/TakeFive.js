import React, { Component } from 'react'
// appToken = cQbEkDeWdMcqRnK5O2Hmh5fFI
import GoHome from './GoHome'
import Navigation from './Navigation'
// import Take5LatestWinningNumbers from './Take5LatestWinningNumbers'

class TakeFive extends Component {

	getLatestWinningNumbers() {
		
		fetch( "https://data.ny.gov/resource/hh4x-xmbw.json?draw_date=2017-08-13")
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson[0].draw_date)
			console.log(responseJson[0].winning_numbers)

			this.props.getTake5LatestWinningNumbers(responseJson[0]);
		})

	}


	/*game information is loaded when
	this component is mounted*/
	componentDidMount() {
		
		let id = this.props.user.id

		fetch( this.props.urlReact + "/" + id)
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson)

			this.props.getTake5Data(responseJson.reverse() );
		})

		this.getLatestWinningNumbers()

	}//end of componentDidMount

	// Old Take 5 numbers are rendered in the page
	displayData() {
		if( this.props.takeFiveData.length === 0 ) {
			return (
				<h1 className = "no-data">No Data Available</h1>
			)
		}
		else {
			return this.props.takeFiveData.map((el, index) => {
				return (
					<div key = { index } >
						<ul className = "list">
							<li className = "take-5-number-styles"> { el.first_number } </li>
							<li className = "take-5-number-styles"> { el.second_number } </li>
							<li className = "take-5-number-styles"> { el.third_number } </li>
							<li className = "take-5-number-styles"> { el.fourth_number } </li>
							<li className = "take-5-number-styles"> { el.fifth_number } </li>
						</ul>
						<div onClick = { () => { this.deleteNumbers(el.id) } } 
							className = "take-5-delete-button">
							Delete
						</div>
					</div>
				)
			})
		}
	}//end of displayData


	/*section that shows numbers 1 - 39
	the user has to choose 5 numbers that will
	be added to the database*/
	chooseNewNumbers() {
		let numbers = [];

		for(var i = 1; i < 40; i++) {
			numbers.push(i);
		}

		return numbers.map((el, index) => {
			return (
				<li 
					className = {  this.active(el) ? "selected-number" : "new-take-5-number-styles"} 
					key = { index }
					onClick = { this.props.newNumber.bind(el) }
				> { el } </li>
			)
		})
	}//end of chooseNewNumbers

	// Return true or false if number is in the 
	// this.state.props.numbers
	active(number) {	
		return this.props.numbers.includes(number)
	}

	/*Adds the new 5 numbers chosen by the user to the
	datase and they will be render on the Previous Numbers
	section on the bottom*/
	addNewNumbers() {
		console.log("Running addNewNumbers!")

		let numbers = this.props.numbers
		let user_id =  this.props.user.id


		console.log("numbers")



		fetch( this.props.urlReact + "/", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: user_id,
				first_number: numbers[0],
				second_number: numbers[1],
				third_number: numbers[2],
				fourth_number: numbers[3],
				fifth_number: numbers[4],
			})
		})
		.then((response) => {
			console.log('&&&&&&    ' + JSON.stringify(response))
			return response.json()
		})
		.then((body) => {
			this.props.updateOldTake5Numbers( JSON.stringify(body) )
			console.log('~~~~~~~~~~~~~' + JSON.stringify(body))
		});

		// this.props.updateOldTake5Numbers()
		// this.props.resetTake5NewNumbersArr()



	}


	/*Button that appears when the user has selected 5
	numbers. This botton when clicked, will trigger
	another function that adds the numbers to the DB*/
	submitButton() {
		if (this.props.numbers.length === 5 ) {
			return (
				<div 
					className = "submit-take-5"
					onClick = { () => { this.addNewNumbers() } }
				>
					<p>Add Numbers</p>
				</div>
			)
		}
	}

	/*Deletes a row of 5 numbers previously saved 
	by the user*/
	deleteNumbers(id) {

		console.log("deleting numbers widh ID:" + id )

		this.props.deleteTake5Numbers(id)


	    fetch( this.props.urlReact + "/" + id, {
	        method: 'DELETE',
	        mode: 'CORS',
	    }).then(res => res)

	}//end of deleteNumbers

	showWinningNumbers() {
		let draw_date = this.props.take5LatestWinningNumbers.draw_date

		// console.log( draw_date ) 
		//draw_date = draw_date.slice(0, draw_date.lastIndexOf("T"))

		return (
			<div className = "take5-winning-numbers">
				<h2>Latest Winning Numbers: </h2>
				<p> { this.props.take5LatestWinningNumbers.winning_numbers } </p>
				<p> { draw_date } </p>

			</div>
		)

	}


	render() {

		return (
			<div className = "take-five">
          		<Navigation getGameMode = { this.props.getGameMode } logout = { this.props.logout } user = { this.props.user }/>


				{ this.showWinningNumbers() }

				<h3 className = "choose-five">Choose 5 Different Numbers</h3>

				<div className = "new-numbers">
					{ this.chooseNewNumbers()}
				</div>

				<div>
					{ this.submitButton() }
				</div>

				<p className = "previous-numbers-text-take5">Your previous Numbers</p>
				<div  className = "old-numbers">
					{ this.displayData() }
				</div>

			</div>

		)
	}
}

export default TakeFive;