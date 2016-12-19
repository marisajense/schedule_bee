import React, { Component} from 'react';
import { connect } from 'react-redux';
// this is just a simulation of employees in the state
let employee = [1,2,3,4,5]

class DayColumn extends Component {


	myDate() {

		let dayOffset = this.props.setdate - this.props.day;
		let fullDate = new Date(Date.now()-((dayOffset * 24)*60*60*1000));
		let myDate = []

		// gets day as three-letter string (e.g. Mon, Tue...) and pushes to myDate[0]
		myDate.push(fullDate.toDateString().substr(0, 3))
		// gets month text and adds date number (e.g. January 12, ...) and pushes to myDate[1]
		let monthNumber = fullDate.getMonth();
		let monthNames = ["January", "February", "March", "April",
											"May", "June", "July", "August", "September",
											"October", "November", "December"]
		myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
		// gets year (e.g. 2016, 2017, etc.) and pushes to myDate[2]
		myDate.push(fullDate.getFullYear())

		return myDate
	}

	highlightToday() {
		// TODO: figure out a way to get the week offset value here
		// so that it doesn't highlight when it's not the current week.
		let date = new Date();
		let today = date.getDay().toString();
		if(this.props.day === today) {
			return styles.dateBoxToday
		} else {
			return styles.dateBox
		}
	}

	addEmployeeRow() {
		// THIS IS JUST SIMULATION SHOWING THAT WE CAN DYNAMICALLY ADD A ROW UNDER EVERY COLUMN
		// FOR WHATEVER THE EMPLOYEE STATE IS SET TO. WE NEED TO FIGURE OUT ADDING EMPLOYEES
		if(employee != 0) {
      return employee.map( e => {
        return(<div id='boxstyle' style={styles.shiftBox}></div>)
			})
		}
	}


	render() {
		let myDate = this.myDate();
		return (
			<div style={styles.leftFloat}>
				<div id='boxstyle' style={this.highlightToday()}>
					<span style={styles.dayText}> {myDate[0]} </span>
					<span style={styles.dateText}> {myDate[1]} </span>
					<span style={styles.yearText}> {myDate[2]} </span>
				</div>
				{ this.addEmployeeRow() }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { setdate: state.setdate }
}

const styles = {
	dateBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #333",
		backgroundColor: "#666",
		background: "linear-gradient(#999, #666)",
		position: "relative"
	},
	dateBoxToday: {
		width: "225px",
		height: "40px",
		border: "1px solid #333",
		backgroundColor: "#666",
		background: "linear-gradient(#99f, #66f)",
		position: "relative"
	},
	dayText: {
		fontWeight: "bold",
		fontSize: "49px",
		color: "#fff",
		opacity: "0.25",
		position: "absolute",
		bottom: "-20px",
		left: "0"
	},
	dateText: {
		fontWeight: "bold",
		fontSize: "22px",
		color: "#fff",
		position: "absolute",
		bottom: "-8px",
		right: "1px",
		textShadow: "0 0 10px rgba(0,0,0,0.35)"
	},
	yearText: {
		fontWeight: "bold",
		fontSize: "20px",
		color: "#000",
		opacity: "0.15",
		position: "absolute",
		top: "-7px",
		right: "0"
	},
		leftFloat: {
			float: 'left'
		},
	shiftBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #666",
		backgroundColor: "#999",
		position: "relative"
	}
}


export default connect(mapStateToProps)(DayColumn);