import React from 'react';
import { connect } from 'react-redux';
import { seteditemployeestate, toggleemployeeedit } from '../actions/editemployee';
import { updateemployees } from '../actions/updateemployeedropdown'
import { currentemployee } from '../actions/setemployee';
import { setFlash } from '../actions/flash';

class EmployeeView extends React.Component {
  constructor(props) {
    super(props)

    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedEmployee = this.submitEdittedEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  componentDidMount(){
    this.props.dispatch(seteditemployeestate())
    $('select').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  display() {
    let employee = this.props.currentemployee
    if(this.props.editemployee) {
      return(
        <div>
          <form className='center' ref='editEmployeeForm' onSubmit={this.submitEdittedEmployee}>
            <label>First Name</label>
            <input ref='employeeFirstName' type='text' defaultValue={employee.first_name} required placeholder="First Name" />
            <label>Last Name</label>
            <input ref='employeeLastName' type='text' defaultValue={employee.last_name} required placeholder="Last Name" />
            <label>Role</label>
            <select ref='employeeRole' defaultValue={employee.role}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            <label>Title</label>
            <input ref='employeeTitle' type='text' defaultValue={employee.title} placeholder="Title" />
            <label>Wage</label>
            <input ref='employeeWage' type='text' defaultValue={employee.wage} placeholder="Wage" />
            <label>Phone Number</label>
            <input ref='employeePhone' type='text' defaultValue={employee.phone} placeholder="Phone Number" />
            <input type='submit' className='btn blue darken-3' value='Update'/>
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <p><b>Name:</b> {employee.first_name} {employee.last_name}</p>
          <p><b>Role:</b> {employee.role}</p>
          <p><b>Title:</b> {employee.title ? employee.title : 'none'}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Phone Number:</b> {employee.phone ? employee.phone : 'none'}</p>
          <p>
          <button style={styles.button} onClick={() => this.toggleEdit()}>Edit</button>
          <button style={styles.deleteButton} onClick={(e) => this.deleteEmployee(e)}>Delete</button>
          </p>
        </div>
      )
    }
  }

  submitEdittedEmployee(e) {
    e.preventDefault()
    let id = this.props.currentemployee.id
    let firstName = this.refs.employeeFirstName.value
    let lastName = this.refs.employeeLastName.value
    let role = this.refs.employeeRole.value
    let title = this.refs.employeeTitle.value
    let phone = this.refs.employeePhone.value
    let wage = (this.refs.employeeWage.value)
    $.ajax({
      type: "PUT",
      url: `/api/users/${id}`,
      dataType: 'JSON',
      data: { user: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        title: title,
        phone: phone,
        wage: wage
      }}
    }).done( employee => {
      let companyID = this.props.setcompany.id
      this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
      this.props.dispatch(updateemployees(companyID))
      this.toggleEdit()
      let messageSuccess = `${employee.first_name} ${employee.last_name} updated`
      this.props.dispatch(setFlash(messageSuccess, 'success'))
    }).fail( data => {
      console.log('failed')
    })
  }

  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault()
    }
    if(this.props.currentemployee.length === 0) {
      alert('Please Select an Employee')
    } else {
      this.props.dispatch(toggleemployeeedit())
    }
  }

  deleteEmployee(e) {
    e.preventDefault()
    if(this.props.currentemployee.length === 0) {
      alert('Please Select an Employee')
    } else {
      let employeeId = this.props.currentemployee.id
      let confirmed = confirm('Are you sure you want to delete?')
      if(confirmed){
        $.ajax({
          url: `/api/users/${employeeId}`,
          type: 'DELETE',
          dataType: 'JSON'
        }).done(employee => {
          debugger
          let ID = this.props.setcompany.id
          this.props.dispatch(updateemployees(ID))
          this.props.dispatch({type: 'REMOVE_CURRENT_EMPLOYEE'})
          let messageSuccess = `${employee.first_name} ${employee.last_name} deleted`
          this.props.dispatch(setFlash(messageSuccess, 'success'))

        }).fail(data => {

        })
      }
    }
  }

  showEmployees() {

    return this.props.setemployee.map( employee => {
      return(<option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>);
    });
  }

  employeeInfo(e) {
    e.preventDefault()
    let id = this.refs.employee.value
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( employee => {
      this.props.dispatch(currentemployee(employee));
    }).fail( data => {
      console.log(data);
    });
  }

  render() {
    return(
      <div>
        <form className='center' onSubmit={(e) => this.employeeInfo(e)}>
          <select ref='employee'>
            { this.showEmployees() }
          </select>
          <input style={styles.button} type='submit' value="View Details" />
        </form>
        <br />
        { this.display() }
      </div>
    )
  }
}

const styles = {
  button: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#1c86ff, #1257a6)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    lineHeight: '25px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #8cb7e8'
  },
  deleteButton: {
    height: '30px',
    padding: '0 10px',
    margin: '6px 5px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#900, #c00)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '20px',
    lineHeight: '25px',
    color: '#fff',
    textShadow: '0 0 10px rgba(0,0,0,0.5), 0 1px #c77'
  }
}

const mapStateToProps = (state) => {
  let { currentemployee, editemployee, setcompany, setemployee } = state;
  return { currentemployee, editemployee, setcompany, setemployee }
}

export default connect(mapStateToProps)(EmployeeView)
