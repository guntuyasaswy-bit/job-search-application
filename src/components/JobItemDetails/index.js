import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {RiShareBoxLine} from 'react-icons/ri'
import Header from '../Header'

const constants = {
  isIntial: 'INTIAL',
  isLoading: 'LOADING',
  isError: 'ERROR',
  noElement: 'zero',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, isLoading: constants.isIntial}

  componentDidMount() {
    this.getDetails()
  }

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
        onClick={this.getDetails}
        type="button"
        className="find-btn logout-btn"
      >
        Retry
      </button>
    </div>
  )

  getDetails = async () => {
    this.setState({isLoading: constants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
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
    if (response.ok) {
      const result = await response.json()
      const filteredJobDetails = {
        id: result.job_details.id,
        title: result.job_details.title,
        companyLogoUrl: result.job_details.company_logo_url,
        companyWebsiteUrl: result.job_details.company_website_url,
        employmentType: result.job_details.employment_type,
        jobDescription: result.job_details.job_description,
        lifeAtCompany: {
          description: result.job_details.life_at_company.description,
          imageUrl: result.job_details.life_at_company.image_url,
        },
        location: result.job_details.location,
        packagePerAnnum: result.job_details.package_per_annum,
        rating: result.job_details.rating,
        skills: result.job_details.skills,
      }

      const filteredSimilarJobs = result.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        location: eachItem.location,
        employmentType: eachItem.employment_type,
        rating: eachItem.rating,
        jobDescription: eachItem.job_description,
      }))

      const filtered = {
        jobDetails: filteredJobDetails,
        similarJobs: filteredSimilarJobs,
      }
      this.setState({jobItemDetails: filtered, isLoading: constants.success})
    } else {
      this.setState({isLoading: constants.isError})
    }
  }

  isLoading = () => (
    <div className="loader-container empty-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onsuccessGet = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    return (
      <>
        <div className="bg-card-JobDetails">
          <div className="company-title-rating">
            <img
              className="company-logo-jobs"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="role-rating">
              <h1 className="company-job-head">{jobDetails.title}</h1>
              <div className="location-jobs">
                <FaRegStar className="react-logo-jobs" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="location-type-salary">
              <div className="location-type">
                <div className="location-jobs">
                  <MdLocationOn className="react-logo-jobs" />
                  <p className="para-min">{jobDetails.location}</p>
                </div>
                <div className="location-jobs">
                  <BsBriefcaseFill className="react-logo-jobs" />
                  <p className="para-min">{jobDetails.employmentType}</p>
                </div>
              </div>

              <div>
                <p className="pacakge-jobs">{jobDetails.packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div className="anchor-container">
              <h1 className="desc">Description</h1>
              <div className="anchor-container">
                <a className="visit-anch" href={jobDetails.companyWebsiteUrl}>
                  Visit
                </a>
                <RiShareBoxLine className="visit-anch" />
              </div>
            </div>
            <p className="para-desc">{jobDetails.jobDescription}</p>
          </div>
          <h1 className="desc">Skills</h1>
          <ul className="skill-ul">
            {jobDetails.skills.map(eachItem => (
              <li key={eachItem.name}>
                <img src={eachItem.image_url} alt={eachItem.name} />
                <p>{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-container">
            <div>
              <h1 className="desc">Life at Company</h1>
              <p className="para-desc">
                {jobDetails.lifeAtCompany.description}
              </p>
            </div>
            <img
              className="life-at-img"
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="desc">Similar Jobs</h1>
        <ul className="ul-similar-jobs">
          {similarJobs.map(eachDetails => (
            <li key={eachDetails.id} className="bg-card-JobDetails-1">
              <div className="company-title-rating">
                <img
                  className="company-logo-jobs"
                  src={eachDetails.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="role-rating">
                  <h1 className="company-job-head">{eachDetails.title}</h1>
                  <div className="location-jobs">
                    <FaRegStar className="react-logo-jobs" />
                    <p>{eachDetails.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="desc">Description</h1>
              <p className="para-desc">{eachDetails.jobDescription}</p>
              <div className="location-type-salary">
                <div className="location-type">
                  <div className="location-jobs">
                    <MdLocationOn className="react-logo-jobs" />
                    <p>{eachDetails.location}</p>
                  </div>
                  <div className="location-jobs">
                    <BsBriefcaseFill className="react-logo-jobs" />
                    <p>{eachDetails.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    let eleThe
    switch (isLoading) {
      case constants.success:
        eleThe = this.onsuccessGet()
        break
      case constants.isLoading:
        eleThe = this.isLoading()
        break
      case constants.isError:
        eleThe = this.isError()
        break
      default:
        eleThe = null
        break
    }

    return (
      <div className="bg-Job-Details">
        <Header />
        {eleThe}
      </div>
    )
  }
}

export default JobItemDetails
