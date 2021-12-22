import { useEffect } from "react"
import styled from "styled-components"
import { generateHeadingText, generateWinnerText } from '../utilities'

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
`
const Heading = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`
const WinnerText = styled.p`
  margin-bottom: 5px;
`
const SpeedText = styled.p`
  margin-bottom: 5px;
`
const Date = styled.p`
  margin-bottom: 5px;
`
const Button = styled.button``

const GamePreview = ({ game: { players, status, speed, winner }, playingAs }) => {

  const headingText = generateHeadingText(players, playingAs)
  const winnerText = generateWinnerText(players, winner)
  
  return (
    <Container>
      <Heading>{headingText}</Heading>
      <WinnerText>{winnerText}</WinnerText>
      <SpeedText>{speed}</SpeedText>
      <Date>5/6/2020</Date>
      <Button>Delete</Button>
    </Container>
  )
}

export default GamePreview