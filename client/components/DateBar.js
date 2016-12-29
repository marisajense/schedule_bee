import React, { Component} from 'react';
import { connect } from 'react-redux';

class DateBar extends Component {
	constructor(props) {
		super(props);
		
		this.showDates = this.showDates.bind(this);
	}

	componentDidMount() {
    $(function(){
      $('.scrollLinkedX').scroll(function(){
        $('.scrollLinkedX').scrollLeft($(this).scrollLeft());    
      })
    })
  }

	myDate(day) {

		let dayOffset = this.props.setdate - day;
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

	highlightToday(day) {
		let dayOffset = this.props.setdate - day;
		if(dayOffset === 0) {
			return {...styles.dateBox, ...styles.dateBoxToday}
		} else {
			return styles.dateBox
		}
	}

	showDates() {
		let days = [0,1,2,3,4,5,6];
		return days.map( day => {
			let myDate = this.myDate(day);
      return(
      	<div key={day} style={styles.leftFloat}>
					<div style={this.highlightToday(day)}>
						<span style={styles.dayText}> {myDate[0]} </span>
						<span style={styles.dateText}> {myDate[1]} </span>
						<span style={styles.yearText}> {myDate[2]} </span>
					</div>
				</div>
      )
		})
	}

	render() {
		return (
			<div style={styles.dateBarWindow} className="scrollLinkedX">
				<div style={styles.dateBar}>
					{this.showDates()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// return { setdate: state.setdate }
	let { setdate, setemployee } = state;
  return { setdate, setemployee }
}

const styles = {
	dateBarWindow: {
		width: '100%',
		height: '40px',
		backgroundColor: "#ccc",
		border: "1px solid black",
		borderBottom: '0px solid black',
		overflow: 'scroll'
	},
	dateBar: {
		width: '1575px'
	},
	dateBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #333",
		backgroundColor: "#666",
		background: "linear-gradient(#999, #333)",
		position: "relative"
	},
	dateBoxToday: {
		backgroundColor: "#66f",
		background: "linear-gradient(#1b7ff2, #1257a6)",
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
	}
}

export default connect(mapStateToProps)(DateBar);