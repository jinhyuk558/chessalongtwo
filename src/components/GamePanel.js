
import styled from "styled-components"
import { generateHeadingText } from '../utilities'

const Container = styled.div`
  padding: 15px;
  border: 1px solid lightgray;
  height: fit-content;
  max-width: 90%;
`
const Header = styled.h1``
const Details = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`
const Detail = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  display: flex;
  align-items: center;
`
const Controls = styled.div`
  display: flex;
`
const MoveBack = styled.div`
  font-size: 40px;
  cursor: ponter;
`
const MoveForward = styled.div`
  font-size: 40px;
  cursor: pointer;
`
const Button = styled.button`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 5px;
`
const CompletedText = styled.span`
  font-weight: 700;
  font-size: 20px;
`

const ColorIndicator = styled.div`
  background-color: ${props => props.color};
  width: 15px;
  height: 15px;
  border: 2px solid black;
  border-radius: 50%;
  margin-left: 5px;
`

const GamePanel = ({ players, playingAs, playingAsColor, status, nextMove, onNextGame, disableNext, onMoveButtonClick, isDeviation, onLichessClick, onRevert, isCompleted }) => {

  const onClick = (e) => {
    e.preventDefault()
    onNextGame()
  }


  return (
    <Container>
      <Header>{generateHeadingText(players, playingAs)}</Header>
      <Details>
        <Detail>You're playing as: {playingAs} 
          <ColorIndicator color={playingAsColor === 'white' ? 'white' : 'black'} />
        </Detail>
        <Detail>Your next move:&nbsp;<strong>{nextMove}</strong></Detail>
        <Detail>Status: {status}</Detail>
        {isCompleted && <CompletedText>(Completed)</CompletedText>}
      </Details>
      {isDeviation && <>
        <Button onClick={onRevert}>Revert</Button>
        <Button onClick={onLichessClick}>Analyze Position on Lichess</Button>
      </>}
      <Controls>
        <MoveBack>
          <ion-icon 
            name="chevron-back-circle-outline"
            onClick={() => onMoveButtonClick('back')}
          ></ion-icon>
        </MoveBack>
        <MoveForward>
          <ion-icon 
            name="chevron-forward-circle-outline"
            onClick={() => onMoveButtonClick('forward')}
          ></ion-icon>
        </MoveForward>
      </Controls>
      <Button
        disabled={disableNext}
        onClick={onClick}
      >Next Game</Button>
    </Container>
  )
}

export default GamePanel