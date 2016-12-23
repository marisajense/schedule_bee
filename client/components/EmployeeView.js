import React from 'react';
import { connect } from 'react-redux';
import { seteditemployeestate, toggleemployeeedit } from '../actions/editemployee';
import { updateemployees } from '../actions/updateemployeedropdown'
import { currentemployee } from '../actions/setemployee';


class EmployeeView extends React.Component {
  constructor(props) {
    super(props)

    this.toggleEdit = this.toggleEdit.bind(this)
    this.submitEdittedEmployee = this.submitEdittedEmployee.bind(this)
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
          <form ref='editEmployeeForm' onSubmit={this.submitEdittedEmployee}>
            <input ref='employeeFirstName' type='text' defaultValue={employee.first_name} required placeholder="First Name" />
            <input ref='employeeLastName' type='text' defaultValue={employee.last_name} required placeholder="Last Name" />
            <select ref='employeeRole' defaultValue={employee.role}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <input ref='employeeTitle' type='text' defaultValue={employee.title} placeholder="Title" />
            <input type='submit' className='btn' />
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <p>Name: {employee.first_name} {employee.last_name}</p>
          <p>Role: {employee.role}</p>
          <p>Title: {employee.title}</p>
          <button onClick={() => this.toggleEdit()}>Edit</button>
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
    debugger

    $.ajax({
      type: "PUT",
      url: `/api/users/${id}`,
      dataType: 'JSON',
      data: { user: {
        first_name: firstName,
        last_name: lastName,
        role: role,
        title: title
      }}
    }).done( employee => {
      let companyID = this.props.setcompany.id
      this.props.dispatch({type: 'CURRENT_EMPLOYEE', employee})
      this.props.dispatch(updateemployees(companyID))
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault()
    }
    this.props.dispatch(toggleemployeeedit())
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
        <form onSubmit={(e) => this.employeeInfo(e)}>
          <select ref='employee'>
            { this.showEmployees() }
          </select>
          <input className='btn blue darken-3' type='submit' />
        </form>
        { this.display() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { currentemployee, editemployee, setcompany, setemployee } = state;
  return { currentemployee, editemployee, setcompany, setemployee }
}

export default connect(mapStateToProps)(EmployeeView)
