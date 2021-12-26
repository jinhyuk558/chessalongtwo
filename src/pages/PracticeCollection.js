import styled from "styled-components"
import { Chessboard } from "react-chessboard"
import GamePanel from "../components/GamePanel"
import { sampleCollectionData } from '../sampleCollectionData'
import Chess from 'chess.js'
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import { publicRequest } from '../makeRequest'

const Container = styled.div`
`
const Wrapper = styled.div`
  display: flex;
`
const BoardSection = styled.div`
  margin-right: 20px;
`
const Title = styled.h1``

const PracticeCollection = () => {

  const location = useLocation()
  const collectionId = location.pathname.split('/')[2]
  
  // API: have a useEffect here that fetches the 
  // collection data from the API.


  // Data from Server (just from sample data for now)
  const [collection, setCollection] = useState(null)

  // Client-Facing Data
  const [clientGame, setClientGame] = useState(new Chess())
  const [gameIndex, setGameIndex] = useState(0)
  const [status, setStatus] = useState('Good')
  // Current Game Data
  const [gameMoves, setGameMoves] = useState([])
  const [playingAsColor, setPlayingAsColor] = useState('white')
  const [moveIndex, setMoveIndex] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [historyNumMovesBack, sethistoryNumMovesBack] = useState(0)
  const [historyFENS, setHistoryFENS] = useState([])
  const [nextGameDisabled, setNextGameDisabled] = useState(false)



  // load data from endpoint
  useEffect(() => {
    publicRequest.get(`/collection/${collectionId}`)
    .then((result) => {
      setCollection(result.data)
      setGameMoves(result.data.gamesList[gameIndex].moves.split(' '))
      console.log('Moves: ' + collection.gamesList[gameIndex].moves.split(' '))
      setPlayingAsColor(
        collection.gamesList[gameIndex].playingAsColor
      )
    })
    .catch((e) => console.log('could not get collection'))
  },[])

  const safeGameMutate = (modify) => {
    setClientGame((g) => {
      const update = { ...g }
      modify(update)
      return update 
    })
  }

  const onDrop = (sourceSquare, targetSquare) => {
    let move = null 
    //console.log('Game Index: ' + gameIndex)
    // console.log('user drop move')
    if (moveIndex >= gameMoves.length || historyNumMovesBack > 0) return false;
    safeGameMutate((clientGame) => {
      move = clientGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })
    })
    if (move === null) return false 
    if (move.san === gameMoves[moveIndex]) {
      // console.log('Move match')
      // Setting index triggers useEffect
      // and causes opponent to move
      setMoveIndex(moveIndex + 1)
      
      setHistoryFENS(prev => [...prev, clientGame.fen()])
    } else {
      setStatus('Calculating Deviation ...')
      setHistoryFENS(prev => [...prev, clientGame.fen()])
    }
    return true
  }

  useEffect(() => {
    console.log('Move Index: ' + moveIndex + ', Game Index: ' + gameIndex + ', Playing as Color: ' + playingAsColor + ', Num Moves BacK ' + historyNumMovesBack, 'FENs Length: ' + historyFENS.length)
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
  },[moveIndex, playingAsColor])
  // playingAsColor is to detect for next game. reason for using this
  // over gameIndex to detect when game changes is because we want to 
  // ensure that playingAsColor is set properly before running the
  // above; otherwise, the correct comptuer move might not be made

  // check game end
  useEffect(() => {
    //console.log('Move Index: ' + moveIndex + ', Game Index: ' + gameIndex, ', Num Moves BacK ' + historyNumMovesBack, 'FENs Length: ' + historyFENS.length)
    if (collection && moveIndex >= gameMoves.length) {
      setGameOver(true)
    }
  },[moveIndex])

  // next game button press
  const onNextGame = () => {
    setNextGameDisabled(true)
    console.log('timeout starting')
    console.log('disabled: ' + nextGameDisabled)
    setTimeout(() => {
      
      setHistoryFENS([])
      sethistoryNumMovesBack(0)
      setClientGame(new Chess())
      setGameMoves(collection.gamesList[gameIndex + 1].moves.split(' '))
      setGameIndex(gameIndex + 1)
      //console.log('Game Index: ' + gameIndex)
      setGameOver(false)
      console.log('timeout ended')
    }, 400)
  }

  // need this because we need to make sure that the below variables
  // are updated AFTER the gameIndex is incremented
  useEffect(() => {
    if (collection) {
      //console.log(collection.gamesList[gameIndex].playingAsColor)
      setPlayingAsColor(collection.gamesList[gameIndex].playingAsColor)
      setMoveIndex(0)
      setNextGameDisabled(false)
    }
  },[gameIndex])


  // Change status when game over
  useEffect(() => {
    if (gameOver && collection) {
      const game = collection.gamesList[gameIndex]
      setStatus(
        game.winner ? 
        `${game.winner} wins (${game.status})` : `Draw with (${game.status})`
      )
    }
  },[gameOver])

  const onMoveButtonClick = (type) => {
    if (type === 'back') {
      if (historyNumMovesBack < historyFENS.length) {
        sethistoryNumMovesBack(historyNumMovesBack + 1)
      }
      // safeGameMutate((clientGame) => {
      //   clientGame.undo();
      // });
    } else {
      console.log('forward')
      if (historyNumMovesBack > 0) {
        sethistoryNumMovesBack(historyNumMovesBack - 1)
      }
    }
  }
  
  return (
    <Container>
      <Navbar />
      hello??
      {collection ? 
      <>
        <Title>Game {gameIndex + 1}/{collection.numGames} in "{collection.name}"</Title>
        <Wrapper>
          <BoardSection>
            <Chessboard 
              position={historyNumMovesBack === 0 ? clientGame.fen() : historyFENS[historyFENS.length - historyNumMovesBack - 1]} 
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
            playingAsColor={playingAsColor}
            nextMove={ 
              gameOver ? 'Game Over!' : 
              ((playingAsColor === 'white' && moveIndex % 2 === 0 ||
              playingAsColor === 'black' && moveIndex % 2 === 1) ? 
              gameMoves[moveIndex] : 'Waiting for opponent ...')
            }
            onNextGame={onNextGame}
            disableNext={
              gameIndex === collection.gamesList.length - 1 ||
              nextGameDisabled
            }
            onMoveButtonClick={onMoveButtonClick}
          />
          
        </Wrapper>
      </>
      : 'Loading ...'}
    </Container>
  )
  
}

export default PracticeCollection



// waits 0.3 seconds and THEN the black capture happens. until that point,
// things are working fine. 

// Current state: some issues with piece perforamcne (laggy
// behaviour when opponent caputring. Not spending time on this now
// until I finish everything else). make sure multiple games in a row
// works and make button to move to the next game. think of any other
// features and if not start working on the API.



// Now: when user makes collection, make that collection
// in the database and link it to user and show also
// let user view it in the profile page

// When click make collection load it in practice mode
// Make profile page
// Make view collection page
// Protected routes: can soeone access make collection w/o being logged in?