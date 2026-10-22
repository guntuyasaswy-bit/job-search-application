import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="bg-img">
    <Header />
    <div className="container-content">
      <h1 className="job-Head">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="job-para">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that that fits your <br />
        abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
