import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobList from '../JobList'

const constants = {
  isIntial: 'INTIAL',
  isLoading: 'LOADING',
  isError: 'ERROR',
  noElement: 'zero',
  success: 'SUCCESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    checkBox: [],
    radio: '',
    inputValue: '',
    jobs: [],
    current: constants.isIntial,
    isLoading: constants.isIntial,
  }

  componentDidMount() {
    this.getDetails()

    this.onClickSearch()
  }

  getDetails = async () => {
    this.setState({isLoading: constants.isLoading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        AUTHORIZATION: `bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const result = await response.json()
      const filtered = {
        shortBio: result.profile_details.short_bio,
        name: result.profile_details.name,
        profileImageUrl: result.profile_details.profile_image_url,
      }
      this.setState({profileDetails: filtered, isLoading: constants.success})
    } else {
      this.setState({isLoading: constants.isError})
    }
  }

  checkBoxCheck = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          checkBox: [...prevState.checkBox, event.target.value],
        }),
        this.onClickSearch,
      )
    } else {
      this.setState(prevState => {
        const updated = prevState.checkBox.filter(
          eachItem => eachItem !== event.target.value,
        )
        return {checkBox: updated}
      }, this.onClickSearch)
    }
  }

  radioCheck = event =>
    this.setState(
      {
        radio: `${event.target.value}`,
      },
      this.onClickSearch,
    )

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onClickSearch = async () => {
    this.setState({current: constants.isLoading})
    const {radio, checkBox, inputValue} = this.state
    const employmentType = checkBox.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${radio}&search=${inputValue}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        AUTHORIZATION: `bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const result = await response.json()
    if (response.ok) {
      if (result.jobs.length > 0) {
        this.setState({jobs: result.jobs, current: constants.success})
      } else {
        this.setState({current: constants.noElement})
      }
    } else {
      this.setState({current: constants.isError})
    }
  }

  isLoading = () => (
    <div className="loader-container empty-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  isSuccess = () => {
    const {inputValue, jobs} = this.state
    return (
      <div className="right-side-content">
        <div className="search-container">
          <input
            onChange={this.onChangeInput}
            value={inputValue}
            className="search-input"
            type="search"
            placeholder="Search"
          />
          <button
            onClick={this.onClickSearch}
            type="button"
            className="search-btn"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-1">
          {jobs.map(eachItem => (
            <JobList job={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  isEmpty = () => (
    <div className="empty-container">
      <img
        className="img-width"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="color-wh">No Jobs Found</h1>
      <p className="color-wh">We could not find any jobs. Try other filters.</p>
    </div>
  )

  isError = () => (
    <div className="empty-container">
      <img
        className="img-width"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="color-wh">Oops! Something Went Wrong</h1>
      <p className="color-wh">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickSearch}
        type="button"
        className="find-btn logout-btn"
      >
        Retry
      </button>
    </div>
  )

  successProfile = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-bg">
        <img
          className="prof-img"
          alt="profile"
          src={profileDetails.profileImageUrl}
        />
        <h1 className="name-head">{profileDetails.name}</h1>
        <p>{profileDetails.shortBio}</p>
      </div>
    )
  }

  profileFailureView = () => (
    <div>
      <button
        onClick={this.getDetails}
        type="button"
        className="find-btn logout-btn"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {inputValue, current, isLoading} = this.state
    let profEle
    switch (isLoading) {
      case constants.isLoading:
        profEle = this.isLoading()
        break
      case constants.success:
        profEle = this.successProfile()
        break
      case constants.isError:
        profEle = this.profileFailureView()
        break
      default:
        profEle = null
        break
    }

    let element
    switch (current) {
      case constants.isLoading:
        element = this.isLoading()
        break
      case constants.success:
        element = this.isSuccess()
        break
      case constants.noElement:
        element = this.isEmpty()
        break
      case constants.isError:
        element = this.isError()
        break
      default:
        element = null
        break
    }
    return (
      <div className="jobs-bg">
        <Header />
        <div className="left-right-container">
          <div className="left-side-content">
            <div className="search-container-1">
              <input
                onChange={this.onChangeInput}
                value={inputValue}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.onClickSearch}
                type="button"
                className="search-btn"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {profEle}
            <hr className="hr" />
            <div className="li-c">
              <h1 className="type-of-emp-head">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <li className="li-class" key={eachItem.employmentTypeId}>
                    <input
                      id={eachItem.employmentTypeId}
                      onChange={this.checkBoxCheck}
                      value={eachItem.employmentTypeId}
                      type="checkbox"
                    />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="hr" />
            <div className="li-c">
              <h1 className="type-of-emp-head">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem => (
                  <li className="li-class" key={eachItem.salaryRangeId}>
                    <input
                      id={eachItem.salaryRangeId}
                      name="options"
                      type="radio"
                      onChange={this.radioCheck}
                      value={eachItem.salaryRangeId}
                    />
                    <label htmlFor={eachItem.salaryRangeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {element}
        </div>
      </div>
    )
  }
}
export default Jobs
