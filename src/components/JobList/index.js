import './index.css'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaRegStar} from 'react-icons/fa'

const JobList = props => {
  const {job} = props
  const filtered = {
    id: job.id,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  }
  return (
    <li className="jobs-container">
      <Link to={`/jobs/${filtered.id}`} className="link">
        <div className="company-title-rating">
          <img
            className="company-logo-jobs"
            src={filtered.companyLogoUrl}
            alt="company logo"
          />
          <div className="role-rating">
            <h1 className="company-job-head">{filtered.title}</h1>
            <div className="location-jobs">
              <FaRegStar className="react-logo-jobs" />
              <p>{filtered.rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="location-type-salary">
            <div className="location-type">
              <div className="location-jobs">
                <MdLocationOn className="react-logo-jobs" />
                <p className="para-min">{filtered.location}</p>
              </div>
              <div className="location-jobs">
                <BsBriefcaseFill className="react-logo-jobs" />
                <p className="para-min">{filtered.employmentType}</p>
              </div>
            </div>

            <div>
              <p className="pacakge-jobs">{filtered.packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <h1 className="desc">Description</h1>
          <p className="para-desc">{filtered.jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobList
