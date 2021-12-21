import styled from "styled-components"
import { Chessboard } from "react-chessboard"
import GamePanel from "../components/GamePanel"
import { sampleCollectionData } from '../sampleCollectionData'
import Chess from 'chess.js'
import { useEffect, useState } from "react"

const Container = styled.div`
  padding: 20px;
`
const Wrapper = styled.div`
  display: flex;
`
const BoardSection = styled.div`
  margin-right: 20px;
`
const Title = styled.h1``

const PracticeCollection = () => {
  
  // API: have a useEffect here that fetches the 
  // collection data from the API.


  // Data from Server (just from sample data for now)
  const [collection, setCollection] = useState(sampleCollectionData)

  // Client-Facing Data
  const [clientGame, setClientGame] = useState(new Chess())
  const [gameIndex, setGameIndex] = useState(0)
  const [status, setStatus] = useState('Good')
  // Current Game Data
  const gameMoves = collection.gamesList[gameIndex].moves.split(' ')
  const [playingAsColor, setPlayingAsColor] = useState(
    collection.gamesList[gameIndex].playingAsColor
  )
  const [moveIndex, setMoveIndex] = useState(
    0
  )
  const [gameOver, setGameOver] = useState(false)
  const [historyNumMovesBack, sethistoryNumMovesBack] = useState(0)
  const [historyFENS, setHistoryFENS] = useState([])


  const safeGameMutate = (modify) => {
    setClientGame((g) => {
      const update = { ...g }
      modify(update)
      return update 
    })
    
  }

  const onDrop = (sourceSquare, targetSquare) => {
    let move = null 
    // console.log('user drop move')
    safeGameMutate((clientGame) => {
      move = clientGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })
    })
    console.log(move)
    if (move === null || moveIndex >= gameMoves.length) return false 
    if (move.san === gameMoves[moveIndex]) {
      // console.log('Move match')
      // Setting index triggers useEffect
      // and causes opponent to move
      setMoveIndex(moveIndex + 1)
      
       
      setHistoryFENS(prev => [...prev, clientGame.fen()])
      console.log(historyFENS)
    } else {
      console.log(moveIndex)
      console.log(move.san, gameMoves[moveIndex])
      setStatus('Calculating Deviation ...')
      setHistoryFENS(prev => [...prev, clientGame.fen()])
      console.log(historyFENS)
    }
    // initiate opponent move here 
    return true
  }

  useEffect(() => {

    if (moveIndex % 2 === 0 && playingAsColor === 'black' ||
        moveIndex % 2 === 1 && playingAsColor === 'white') {
      // console.log('computer move')
      let moving = false
      setTimeout(()=>{
        safeGameMutate((clientGame) => {
          let opponentMove = null
          if (!moving) {
            
            opponentMove = clientGame.move(gameMoves[moveIndex])
            moving = true
            // even if client drops his piece before setGameIndex
            // completes, it will be an invalid move and will
            // not be registered since moveIndex will not match
            // with the side they are playing on
            setMoveIndex(moveIndex + 1)
            setHistoryFENS(prev => [...prev, clientGame.fen()])
          }
          
        })
      },500)
    
      moving = false
    }
  },[moveIndex])
  useEffect(() => {
    // when the game ends
    if (moveIndex >= gameMoves.length) {
      // reset the board, reset playingAs, reset chess client instance, etc
      
      // make a button to move to next game

      setGameOver(true)
      

      // check if you've reached the end of collection
    }
  },[moveIndex])

  const onNextGame = () => {
    
    setClientGame(new Chess())
    setGameIndex(gameIndex + 1)
    setGameOver(false)
    
  }

  // need this because we need to make sure that the below variables
  // are updated AFTER the gameIndex is incremented
  useEffect(() => {
    setPlayingAsColor(collection.gamesList[gameIndex].playingAsColor)
    setMoveIndex(0)
  },[gameIndex])


  // Change status when game over
  useEffect(() => {
    if (gameOver) {
      const game = collection.gamesList[gameIndex]
      setStatus(
        game.winner ? 
        `${game.winner} wins (${game.status})` : `Draw with (${game.status})`
      )
    }
  },[gameOver])

  const onMoveButtonClick = (type) => {
    if (type === 'back') {
      sethistoryNumMovesBack(historyNumMovesBack + 1)
      // safeGameMutate((clientGame) => {
      //   clientGame.undo();
      // });
    } else {
      console.log('forward')
      sethistoryNumMovesBack(historyNumMovesBack - 1)
      clientGame.load(historyFENS[historyNumMovesBack])
    }
  }
  


  return (
    <Container>
      <Title>Game {gameIndex + 1}/{collection.numGames} in "{collection.name}"</Title>
      <Wrapper>
        <BoardSection>
          <Chessboard 
            position={historyNumMovesBack === 0 ? clientGame.fen() : historyFENS[historyFENS.length - historyNumMovesBack]} 
            onPieceDrop={onDrop} 
            boardOrientation={playingAsColor} 
          />
        </BoardSection>
        <GamePanel 
          players={collection.gamesList[gameIndex].players} 
          playingAs={collection.gamesList[gameIndex].playingAs}
          status={
            status
          }
          nextMove={ 
            gameOver ? 'Game Over!' : 
            ((playingAsColor === 'white' && moveIndex % 2 === 0 ||
             playingAsColor === 'black' && moveIndex % 2 === 1) ? 
             gameMoves[moveIndex] : 'Waiting for opponent ...')
          }
          onNextGame={onNextGame}
          disableNext={gameIndex === collection.gamesList.length - 1}
          onMoveButtonClick={onMoveButtonClick}
        />
        
      </Wrapper>
    </Container>
  )
  
}

export default PracticeCollection



// waits 0.3 seconds and THEN the black capture happens. until that point,
// things are working fine. 

// Current state of project: some issues with piece perforamcne (laggy
// behaviour when opponent caputring. Not spending time on this now
// until I finish everything else). Now, make sure multiple games in a row
// work and make a button to move to the next game. Then, think of any other
// features and if not I might start working on the API.




// NOW: fix the moving back/forth system, decide if I want to have it at all,
// then probably work on the API