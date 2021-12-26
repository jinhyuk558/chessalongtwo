import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
`

const HomePage = () => {
  return (
    <Container>
      <Navbar />
      This is the home page
    </Container>
  )
}

export default HomePage