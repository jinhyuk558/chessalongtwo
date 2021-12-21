
import styled from "styled-components"
import { generateHeadingText } from '../utilities'

const Container = styled.div`
  padding: 15px;
  border: 1px solid lightgray;
  height: fit-content;
`
const Header = styled.h2``
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
const Button = styled.button``

const ColorIndicator = styled.div`
  background-color: {props.color};
  width: 15px;
  height: 15px;
  border: 2px solid black;
  border-radius: 50%;
  margin-left: 5px;

`

const GamePanel = ({ players, playingAs, status, nextMove, onNextGame, disableNext, onMoveButtonClick }) => {

  const onClick = (e) => {
    e.preventDefault()
    onNextGame()
  }

  

  return (
    <Container>
      <Header>{generateHeadingText(players, playingAs)}</Header>
      <Details>
        <Detail>You're playing as: {playingAs} 
          <ColorIndicator color={playingAs === 'white' ? 'white' : 'black'} />
        </Detail>
        <Detail>Your next move: <strong>{nextMove}</strong></Detail>
        <Detail>Status: {status}</Detail>
      </Details>
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