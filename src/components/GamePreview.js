import { generateHeadingText, generateWinnerText } from '../utilities'


const GamePreview = ({ 
  game: { players, status, speed, winner }, 
  playingAs, onDeleteGame, id }) => {

  const headingText = generateHeadingText(players, playingAs)
  const winnerText = generateWinnerText(players, winner)
  
  return (
    <div className="card mb-1">
      <div className="card-content">
        <div className="content">
          <span className="is-size-4 has-text-weight-semibold">{headingText}</span>
          <div style={{"display": "flex"}} className="mt-1">
            <p className="">
              {winnerText === 'draw' ? 
                <p className="has-text-weight-medium">Draw •</p> : 
                <p className="has-text-weight-medium">{winnerText} wins •</p> 
              }
            </p>
            <p>&nbsp;{speed} •</p>
            <p>&nbsp;5/6/2020</p>
          </div>
          <button className="button is-warning" onClick={(e) => {
            e.preventDefault()
            onDeleteGame(id)
          }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default GamePreview