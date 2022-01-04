import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div style={{"display": "flex", "minHeight": "100vh", "flexDirection": "column"}}>
      <Navbar />
      <section className="container mb-5 mt-6" style={{"flex": "1"}}>
        <div className="card has-background-warning">
          <div className="card-content">
            <div className="container">
              <p className="title"> 
              Build your chess intuition through repetition
              </p>
              <p className="subtitle">
              Replay through hundreds of master games selected by yourself
              </p>
              
              <img style={{"width":"65%"}} src={ require('../images/Screenshot (3).png')}  />
              <p></p>
              <div className="mt-2">
                <Link className="button is-primary is-medium mr-2" to="/register">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light is-medium" to="/login">
                  Log in
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default LandingPage