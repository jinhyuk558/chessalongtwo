import { generateHeadingText, generateWinnerText } from '../utilities'


const GamePreview = ({ 
  game: { players, status, speed, winner }, 
  playingAs, onDeleteGame, id, createdAt }) => {

  const headingText = generateHeadingText(players, playingAs)
  const winnerText = generateWinnerText(players, winner)
  const tempDate = new window.Date(createdAt)
  console.log('TEST: ' + createdAt)
  const dateText = (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()
  
  return (
    <div className="card mb-1">
      <div className="card-content">
        <div className="content">
          <span id='gamePreviewTitle' className="is-size-4 has-text-weight-semibold">
            {headingText}
          </span>
          <div id='gamePreviewDiv' style={{"display": "flex"}} className="mt-1">
            <span className="mr-1">
              {winnerText === 'draw' ? 
                <span className="has-text-weight-medium">Draw</span> : 
                <span className="has-text-weight-medium">{winnerText} wins</span> 
              }
            </span>
            <span className='mr-1 mb-1'>
              <span className="has-text-weight-medium">{speed}&nbsp;</span>
              <span className="">{dateText}</span>
            </span>
            
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