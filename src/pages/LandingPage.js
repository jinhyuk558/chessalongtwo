import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div``
const Heading = styled.span`
  font-size: 15px;
`
const Subtitle = styled.span``

const LandingPage = () => {
  return (
    <Container>
      <Navbar />
      <Heading>
        Chessalong helps build your chess intuition through repetition. Replay through hundreds of master games selected by you and improve.
      </Heading>
      <Subtitle>
        
      </Subtitle>
      
      
    </Container>
  )
}

export default LandingPage