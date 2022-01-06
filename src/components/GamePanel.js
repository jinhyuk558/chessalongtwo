
import styled from "styled-components"
import { generateHeadingText } from '../utilities'
import { faCircle, faChevronCircleLeft, faChevronCircleRight  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle as regularCircle } from "@fortawesome/free-regular-svg-icons"
import {useMediaQuery} from 'react-responsive'


const Controls = styled.div`
  display: flex;
  flex-direction: ${props => props.flexRow ? 'row' : 'column'}
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

  const isFullhd = useMediaQuery({ query: '(min-width: 1408px)' })
  const isWidescreen = useMediaQuery({ query: '(min-width: 1216px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 769px)' })
  const isMobile = useMediaQuery({ query: '(min-width: 300px)' })

  const onClick = (e) => {
    e.preventDefault()
    onNextGame()
  }

  return (
    <div className="card has-background-grey-darker mt-2-tablet">
      <div className="card-content has-text-white">
        <p className="is-size-2-fullhd is-size-3-widescreen is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-weight-semibold mb-2-widescreen mb-1">
          {generateHeadingText(players, playingAs)}
        </p>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <span className="is-size-4-fullhd is-size-5-widescreen is-size-6-tablet">
            {(isDesktop || isTablet || isMobile) ? 'Playing as: ' : 'You\'re playing as: ' }
            {playingAs} 
            <FontAwesomeIcon 
              icon={playingAsColor === 'white' ? faCircle : regularCircle} 
              className="ml-1" fontWeight={400} 
            />
          </span>
          <span className="is-size-4-fullhd is-size-5-widescreen  is-size-6-tablet">
            Your next move:&nbsp;<strong style={{"color": "white"}}>{nextMove}</strong>
          </span>
          <span className="is-size-4-fullhd is-size-5-widescreen mb-2-widescreen is-size-6-tablet">
            Status: {status}
          </span>
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
        <Controls flexRow={!isDesktop}>
          {isDesktop &&
            <div style={{"display": "flex"}}>
              <MoveBack>
                <FontAwesomeIcon 
                  icon={faChevronCircleLeft} 
                  className="mr-2 mb-2-widescreen mb-1 is-size-2-widescreen is-size-3-desktop is-size-3-tablet" 
                  onClick={() => onMoveButtonClick('back')} 
                />
              </MoveBack>
              <MoveForward>
                <FontAwesomeIcon 
                  icon={faChevronCircleRight} 
                  className="mb-2-widescreen mb-1 is-size-2-widescreen is-size-3-desktop is-size-3-tablet" 
                  onClick={() => onMoveButtonClick('forward') } 
                />
              </MoveForward>
            </div>
          }
          <div>
            <button
              className="button is-warning is-normal-desktop is-small"
              disabled={disableNext}
              onClick={onClick}
            >Next Game</button>
          </div>
        </Controls>
        
      </div>
    </div>
  )
}

export default GamePanel