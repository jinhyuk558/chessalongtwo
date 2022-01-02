import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div``
const Heading = styled.span`
  font-size: 15px;
`
const Subtitle = styled.span``

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <p className="title"> 
            Build your chess intuition through repetition
            </p>
            <p className="subtitle">
            Replay through hundreds of master games selected by yourself.
            </p>
          </div>
        </div>
        
        
        
      </section>
    </>
  )
}

export default LandingPage