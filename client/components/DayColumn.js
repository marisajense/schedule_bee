import React, { Component} from 'react';
import { connect } from 'react-redux';

class DayColumn extends Component {
	

	myDate() {
		let dayOffset = this.props.setdate - this.props.day;
		let fullDate = new Date(Date.now()-((dayOffset * 24)*60*60*1000));
		let dateLength = fullDate.toDateString();
		let myDay = fullDate.toDateString().substr(0, dateLength.length - 5)
		// let myDay = (fullDate.getMonth() + 1) + "/" + fullDate.getDate() + "/" + fullDate.getFullYear()
		return myDay
	}


	render() {
		let myDay = this.myDate();
		return (
			<div>
				<div style={styles.dateBox}>{myDay}</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { setdate: state.setdate }
}

const styles = {
	dateBox: {
		width: "250px",
		height: "40px",
		textAlign: 'center',
		fontSize: '20px',
		lineHeight: "38px",
		border: "1px solid blue",
		backgroundColor: "lightblue",
		float: 'left'
	}
}

export default connect(mapStateToProps)(DayColumn);