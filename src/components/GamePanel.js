
import styled from "styled-components"
import { generateHeadingText } from '../utilities'
import { faCircle, faChevronCircleLeft, faChevronCircleRight  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as regularCircle } from "@fortawesome/free-regular-svg-icons"


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
const CompletedText = styled.span`
  font-weight: 700;
  font-size: 20px;
`

const GamePanel = ({ 
  players, playingAs, playingAsColor, status, nextMove, 
  onNextGame, disableNext, onMoveButtonClick, isDeviation, 
  onLichessClick, onRevert, isCompleted }) => {

  const onClick = (e) => {
    e.preventDefault()
    onNextGame()
  }

  return (
    <div className="card has-background-grey-darker">
      <div className="card-content has-text-white">
        <p className="is-size-2 has-text-weight-semibold mb-2">
          {generateHeadingText(players, playingAs)}
        </p>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <span className="is-size-4">You're playing as: {playingAs} 
            <FontAwesomeIcon 
              icon={playingAsColor === 'white' ? faCircle : regularCircle} 
              className="ml-1" fontWeight={400} 
            />
          </span>
          <span className="is-size-4">
            Your next move:&nbsp;<strong style={{"color": "white"}}>{nextMove}</strong>
          </span>
          <span className="is-size-4 mb-2">Status: {status}</span>
          {isCompleted && <CompletedText className="mb-2">(Completed)</CompletedText>}
        </div>
        {isDeviation && <>
          <button className="button is-small mr-2 mt mb-2 is-link " onClick={onRevert}>
            Revert
          </button>
          <button className="button is-small mb-2 is-link" onClick={onLichessClick}>
            Analyze Position on Lichess
          </button>
        </>}
        <Controls>
          <MoveBack>
            <FontAwesomeIcon 
              icon={faChevronCircleLeft} 
              className="mr-2 mb-2" 
              onClick={() => onMoveButtonClick('back')} 
            />
          </MoveBack>
          <MoveForward>
            <FontAwesomeIcon 
              icon={faChevronCircleRight} 
              className="mb-2" 
              onClick={() => onMoveButtonClick('forward') } 
            />
          </MoveForward>
        </Controls>
        <button
          className="button is-warning"
          disabled={disableNext}
          onClick={onClick}
        >Next Game</button>
      </div>
    </div>
  )
}

export default GamePanel