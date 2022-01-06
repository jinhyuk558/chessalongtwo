import styled from "styled-components"
import { Chessboard } from "react-chessboard"
import GamePanel from "../components/GamePanel"
import { sampleCollectionData } from '../sampleCollectionData'
import Chess from 'chess.js'
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import { publicRequest, testInstance } from '../services/makeRequest'
import GridNavigation from "../components/GridNavigation"
import { faChessQueen, faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import {useMediaQuery} from 'react-responsive'

const MainWrapper = styled.div`
  padding: ${props => props.tablet ? '10px 10px' : '10px 60px'};

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.movePanelDown ? 'column' : 'row'}
`
const BoardSection = styled.div`
  margin-right: 20px;
`

const PracticeCollection = () => {

  const location = useLocation()
  const collectionId = location.pathname.split('/')[2]
  
  // API: have a useEffect here that fetches the 
  // collection data from the API.

  // Data from Server 
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
  const user = useSelector(state => state.currentUser)
  const [nextGameDisabled, setNextGameDisabled] = useState(false)

  // State for handling deviation
  const [isDeviation, setIsDeviation] = useState(false)

  // Array for completed games
  const [completedGames, setCompletedGames] = useState([])
  let moveSnd = new Audio(require('../sounds/move.wav'))
  let captureSound = new Audio(require('../sounds/captureEdited.wav'))

  // MEDIA QUERIES  
  const isFullhd = useMediaQuery({ query: '(min-width: 1408px)' })
  const isWidescreen = useMediaQuery({ query: '(min-width: 1216px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isTabletBig = useMediaQuery({ query: '(min-width: 900px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 769px)' })
  const isTabletSmall = useMediaQuery({ query: '(min-width: 600px)' })
  const isMobileBig = useMediaQuery({ query: '(min-width: 490px)' })
  const isMobile = useMediaQuery({ query: '(min-width: 420px)' })
  const isMobileSmall = useMediaQuery({ query: '(min-width: 315px)' })



  // mobile: up to 768px
  // tablet: from 769px
  // desktop: from 1024px
  // widescreen: from 1216px


  // load data from endpoint
  useEffect(() => {
    if (!user) return
    testInstance.get(`/collection/user/${collectionId}/${user._id}`)
    .then((result) => {
      setCompletedGames(new Array(result.data.numGames).fill(false))
      console.log('Heres the array: ' + new Array(result.data.numGames).fill(false))
      setCollection(result.data)
      setGameMoves(result.data.gamesList[gameIndex].moves.split(' '))
      setPlayingAsColor(
        collection.gamesList[gameIndex].playingAsColor
      )
    })
    .catch((e) => {

    })
  },[])

  const safeGameMutate = (modify) => {
    setClientGame((g) => {
      const update = { ...g }
      modify(update)
      return update 
    })
  }

  const playSound = () => {
    moveSnd.currentTime = 0
    moveSnd.play()
  }

  const playCapture = () => {
    captureSound.currentTime = 0
    captureSound.play()
  }

  const onDrop = (sourceSquare, targetSquare) => {

    // first, save the current game state fen so
    // it can be used when deviation is made
    const initialFEN = clientGame.fen()

    let move = null 
    // console.log('user drop move')

    if (moveIndex >= gameMoves.length || historyNumMovesBack > 0) {
      return false
    }
    safeGameMutate((clientGame) => {
      move = clientGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })
    })
    if (move === null) return false 
    
    if (move.captured) {
      playCapture()
    } else {
      playSound()
    }
    
    if (move.san === gameMoves[moveIndex]) {
      // console.log('Move match')
      // Setting index triggers useEffect
      // and causes opponent to move
      setMoveIndex(moveIndex + 1)

      setHistoryFENS(prev => [...prev, clientGame.fen()])
    } else {
      setStatus('Calculating Deviation ...')
      setHistoryFENS(prev => [...prev, clientGame.fen()])
      publicRequest(`/analysis?fen=${clientGame.fen()}`)
        .then(result => {
          const data = result.data 

          // original
          const tempChess = new Chess()
          tempChess.load(initialFEN)
          tempChess.move(gameMoves[gameIndex]) 
          const tempFEN = tempChess.fen()
          publicRequest(`/analysis?fen=${tempFEN}`)
            .then(result => {
              const otherData = result.data

              
              // make comparison here
              console.log('comparison: ' + otherData.pvs[0].cp + ' vs ' + data.pvs[0].cp)
              if (data.pvs[0].cp - otherData.pvs[0].cp >= -30 && playingAsColor === 'white' ||
                 data.pvs[0].cp - otherData.pvs[0].cp <= 30 && playingAsColor === 'black') {
                setStatus('Move is about equal/better.')
              } else {
                setStatus('Move not about equal/better. ')
              }
              setIsDeviation(true)
            })
            .catch(e => {
              setStatus('Unable to provide analysis. ')
              setIsDeviation(true)
              console.log('Caught error in second fetch')
            })
        })
        .catch(e => {
          console.log('Caught error in first fetch')
          setStatus('Unable to provide analysis. ')
          setIsDeviation(true)
        })
       
    }
    return true
  }

  useEffect(() => {
    //console.log('Move Index: ' + moveIndex + ', Game Index: ' + gameIndex + ', 
    // Playing as Color: ' + playingAsColor + ', Num Moves BacK ' + historyNumMovesBack, 
    // 'FENs Length: ' + historyFENS.length)
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
    // console.log('Move Index: ' + moveIndex + ', Game Index: ' + 
    // gameIndex, ', Num Moves BacK ' + historyNumMovesBack, 'FENs Length: ' + 
    // historyFENS.length)
    if (collection && moveIndex >= gameMoves.length) {
      setGameOver(true)
      let newArray = [...completedGames]
      newArray[gameIndex] = true
      setCompletedGames(newArray)
    }
  },[moveIndex])

  // next game button press
  const onNextGame = (optionalGameIndex) => {
    if (gameIndex === collection.gamesList.length - 1 && !optionalGameIndex) return
    setNextGameDisabled(true)
    //console.log('timeout starting')
    //console.log('disabled: ' + nextGameDisabled)
    setTimeout(() => {
      setHistoryFENS([])
      sethistoryNumMovesBack(0)
      setClientGame(new Chess())

      if (optionalGameIndex) {
        setGameMoves(collection.gamesList[optionalGameIndex].moves.split(' '))
        setGameIndex(parseInt(optionalGameIndex))
      } else {
        setGameMoves(collection.gamesList[gameIndex + 1].moves.split(' '))
        setGameIndex(gameIndex + 1)
      }
      
      setGameOver(false)
      //console.log('timeout ended')
    }, 400)
  }

  // need this because we need to make sure that the below variables
  // are updated AFTER the gameIndex is incremented
  useEffect(() => {
    console.log('New game Index: ' + gameIndex)
    if (collection) {
      setStatus('Good')
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
        //console.log(historyFENS)
        //console.log('Compare: ' + historyNumMovesBack + ' ' + historyFENS.length)
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

  // Open Lichess Analysis Board (might change to look at current fen too)
  const onLichessClick = () => {
    const index = historyFENS.length > 1 ? historyFENS.length - 1 : historyFENS.length - 1
    const newWindow = window.open(
      `https://lichess.org/analysis?fen=${historyFENS[index]}`, 
      '_blank', 
      'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  // When user deviates and clicks on revert button
  const onRevert = () => {
    playSound()
    clientGame.undo()
    setHistoryFENS(historyFENS.slice(0, -1))
    setStatus('Good')
    setIsDeviation(false)
  }

  // Functions on Grid Navigation/Marking current game complete
  const onMarkComplete = (e) => {
    e.preventDefault()
    let newArray = [...completedGames]
    newArray[gameIndex] = true
    setCompletedGames(newArray)
    onNextGame()
  }
  const onGridClick = (index) => {
    onNextGame(index)
  }

  const onShareClick = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(`localhost:3000/practice/${collection._id}`)
  }

  const determineBoardWidth = () => {
    if (isFullhd) {
      return 700
    } else if (isWidescreen) {
      return 650
    } else if (isDesktop) {
      console.log('DESKTOP')
      return 550
    } else if (isTabletBig) {
      return 570
    } else if (isTablet) {
      console.log('TABLET')
      return 510
    } else if (isTabletSmall) {
      // this is when the game panel goes down
      return 550
    } else if (isMobileBig) {
      return 450
    } else if (isMobile) {
      console.log('MOBILE')
      return 400
    } else if (isMobileSmall) {
      console.log('MOBILE SMALL')
      return 250
    }
    return 300
  }

  const test = () => {
    console.log('Mobile: '  + isMobile + ', Tablet: ' + isTablet)
    return isMobile || isTablet
  }
  
  return (
    <div style={{"display": "flex", "minHeight": "100vh", "flexDirection": "column"}}>
      <Navbar />
      <div className=" " style={{"flex": "1"}}>
        {collection ? 
        <>
          <MainWrapper tablet={!isDesktop} mobile={!isTablet}>
            <div className={`card has-background-white-ter mt-3`}>
              <div className={`card-content`}>
                <span class={`icon-text ${!isTablet ? 'is-size-4 mb-1' : 'is-size-3 mb-2'} `}>
                  {isTabletSmall &&
                  <span class="icon">
                    <FontAwesomeIcon icon={faChessQueen} className="" />
                  </span>}
                  <p className="mb-3  has-text-weight-bold">Playing {collection.name}</p>
                </span>
                <Wrapper movePanelDown={!isTablet}>
                  <BoardSection className={`${!isTablet ? 'mb-2' : ''}`}>
                    <Chessboard 
                      position={historyNumMovesBack === 0 ? clientGame.fen() : 
                                historyFENS[historyFENS.length - historyNumMovesBack - 1]} 
                      onPieceDrop={onDrop} 
                      boardOrientation={playingAsColor} 
                      boardWidth={
                        determineBoardWidth()
                      }
                    />
                  </BoardSection>
                  <div >
                    <GamePanel 
                      players={collection.gamesList[gameIndex].players} 
                      playingAs={collection.gamesList[gameIndex].playingAs}
                      status={status}
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
                      isDeviation={isDeviation}
                      onLichessClick={onLichessClick}
                      onRevert={onRevert}
                      isCompleted={completedGames[gameIndex]}
                    />
                    <GridNavigation 
                      completedGames={completedGames} 
                      onGridClick={onGridClick} 
                      currentIndex={gameIndex} 
                      />
                    <button 
                      className="button mt-3 is-info mr-2" 
                      disabled={nextGameDisabled} 
                      onClick={onMarkComplete}
                    >
                      Mark This Game Complete
                    </button>
                    {collection.isPublic && 
                      <button className="button mt-3 is-info" onClick={onShareClick}>
                          <FontAwesomeIcon icon={faShare} className="mr-1" />
                          Copy link
                      </button>
                    }
                    
                  </div>

                </Wrapper>
              </div>
            </div>
          </MainWrapper>
        </>
        :
        <header className="header">
          <div className="container mt-5">
            You are not authorized to view this. Please log out and try again.
          </div>
        </header> 
        }
      </div>
     
    </div>
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