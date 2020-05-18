import React, { Component } from 'react'
import api from '../../services/apiConfig'

export default class Signin extends Component {
  // required states: text to match input fields
  // required props: setToken for if successful api call 
  constructor(props) {
    super(props)
    this.state = {
      inputUsername: '',
      inputPassword: '',
      errMsg: '',
      canSubmit: false
    }
  }

  // ============
  // methods 
  // ============

  // set the state with the state name and e.target.value 
  handleChange = async (e, stateName) => {
    await this.setState({
      [stateName]: e.target.value
    })
    await this.setState({
      canSubmit: this.canSubmit()
    })
  }

  // handle on submit => what happens when form is submitted
  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.state.canSubmit) {
      // when form is submitted, do api call and set the token if successful

      try {
        const response = await api.post('/signin', {
          username: this.state.inputUsername,
          password: this.state.inputPassword
        })

        console.log(response)
        this.props.setToken(response.data.token, response.data.user)

        // empty out the inputs for better ux 
        this.setState({
          inputUsername: '',
          inputPassword: ''
        })
      } catch (er) {
        console.log(er)
        this.setState({
          errMsg: er.message || 'The api call failed'
        })
      }
    } else {
      // either password or email is wrong 
      this.setState({
        errMsg: "Please make sure the email and password are valid"
      })
    }
  }

  // check if we can submit
  canSubmit = () => {
    // check inputs to see if we can submit 
    // password needs to be 6 letters (we are lax for testing)

    if (this.state.inputPassword.length < 6) {
      this.setState({
        errMsg: "Passwords need to be at least 6 characters"
      })
      return false
    }

    this.setState({
      errMsg: ""
    })
    return true
  }

  // ============
  // render
  // ============
  render() {
    if (this.state.creationSuccess) {
      return (<div>
        <h1>Thank you for signing up!</h1>
      </div>)
    } else {

      return (
        <div>
          <h3>Sign in</h3>
          <ul>
            <li>Sign in with your username and password</li>
            <li>If you did not make an account, please go to 'Create Account'</li>
          </ul>
          <form onSubmit={this.handleSubmit}>
            {this.state.errMsg ? <p className="error">{this.state.errMsg}</p> : null}

            <label>Username</label>
            <input type="text" value={this.state.inputUsername}
              onChange={e => this.handleChange(e, 'inputUsername')}
            />

            <label>Password</label>
            <input type="text" value={this.state.inputPassword}
              onChange={e => this.handleChange(e, 'inputPassword')}
            />

            <button disabled={!this.state.canSubmit}>Submit</button>
          </form>
        </div>
      )
    }
  }
}
