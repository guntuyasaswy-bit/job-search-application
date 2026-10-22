import './index.css'

import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const btnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <header className="head-con">
      <Link to="/" className="link">
        <button className="logo-btn" type="button">
          <img
            className="logo-head-home"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </button>
      </Link>

      <ul className="home-job-container">
        <Link to="/" class="link-remover">
          <li>
            <button type="button" className="home-jobs-btn">
              Home
            </button>
          </li>
        </Link>
        <Link to="/jobs" class="link-remover">
          <li>
            <button type="button" className="home-jobs-btn">
              Jobs
            </button>
          </li>
        </Link>
      </ul>
      <Link to="/login" class="link-remover-2">
        <button
          className="find-btn logout-btn"
          onClick={btnLogout}
          type="button"
        >
          Logout
        </button>
      </Link>
      <div className="home-small-container">
        <Link to="/">
          <button type="button" className="small-btn-logo">
            <AiFillHome />
          </button>
        </Link>
        <Link to="/jobs">
          <button type="button" className="small-btn-logo">
            <BsFillBriefcaseFill />
          </button>
        </Link>
        <Link to="/login">
          <li>
            <button
              type="button"
              onClick={btnLogout}
              className="small-btn-logo"
            >
              <FiLogOut />
            </button>
          </li>
        </Link>
      </div>
    </header>
  )
}

export default withRouter(Header)
