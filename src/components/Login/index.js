import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', error: false, errMsg: ''}

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const respone = await fetch(url, options)
    const result = await respone.json()

    if (respone.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', result.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      this.setState({error: true, errMsg: result.error_msg})
    }
  }

  render() {
    const {username, password, error, errMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-card">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUserName}
              value={username}
              placeholder="Username"
              className="input-elemet"
              id="username"
              type="text"
            />
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
              className="input-elemet"
              id="password"
              type="password"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {error && <p className="err-msg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
