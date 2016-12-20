import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { first_name, last_name, email, password, password_confirmation, role } = this.refs;
    let company_id = 1
    let user = { user: {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      role: role.value,
      company_id
    }}
    $.ajax({
      url: '/users',
      type: 'POST',
      data: user,
      dataType: 'JSON'
    }).done( user => {
      this.props.dispatch(login(user))
      this.props.history.push('/dashboard')
    }).fail( err => {
    })
  }


  render() {
    return(
      <div>
        <h2 className='center'>Sign Up</h2>
        <form className='container' onSubmit={this.handleSubmit}>
          <input placeholder='First Name' ref='first_name' required={true} />
          <input placeholder='Last Name' ref='last_name' required={true} />
          <input type='email' placeholder='Email' ref='email' required={true} />
          <input type='password' placeholder='Password' ref='password' required={true} />
          <input type='password' placeholder='Password Confirmation' ref='password_confirmation' required={true} />
          <input type='hidden' ref='role' value='admin' />

          <button className='btn blue darken-3'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default connect()(SignUp)
