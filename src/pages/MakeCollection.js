import { useEffect, useState } from "react"
import styled from "styled-components"
import FilterPanel from "../components/FilterPanel"
import GamePreview from "../components/GamePreview"
import { publicRequest, testInstance, userRequest } from '../services/makeRequest'
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { withRouter } from "react-router-dom"
import SearchFilterPanel from "../components/SearchFilterPanel"
import { faSearch, faChessKnight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Button = styled.button`
  margin-top: 20px;
  height: 42px;
  color: white;
  background-color: #252D3B;
  border: none;
  cursor: pointer;
  padding: 2px 10px;
`
const Input = styled.input`
  padding: 10px 15px;
  width: 35%;
`
const VisibilitySection = styled.div``
const Visibility = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`
const Label = styled.p`
  margin-right: 5px;
`
const Select = styled.select`
  margin-right: 10px;
  height: 40px;
  font-size: 17px;
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 4px;
  color: 	#363636;
`
const Option = styled.option``
const Error = styled.p`
  color: red;
  margin-bottom: 5px;
`

const MakeCollection = () => {

  const [gamesList, setGamesList] = useState([])
  const [playingAs, setPlayingAs] = useState('')
  const [username, setUsername] = useState('RealDavidNavara')
  const [numGames, setNumGames] = useState(10)
  const [variant, setVariant] = useState('rapid')
  const [loadingGames, setLoadingGames] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const currentUser = useSelector(state => state.currentUser)
  // this is an array of the players featured in this collection
  const [playersList, setPlayersList] = useState([])
  const [isPublic, setIsPublic] = useState(false)
  const history = useHistory()
  // other state variables
  const [noGamesFound, setNoGamesFound] = useState(false)
  const [loadingCollection, setLoadingCollection] = useState(false)
  const [maxGamesReached, setMaxGamesReached] = useState(false)
  const MAX_NUM_GAMES = 40

  
  const onFindGamesClick = (e) => {
    console.log('HERE' + gamesList)
    e.preventDefault()
    if (maxGamesReached) {
      return
    }
    setLoadingGames(true)
        
    // with the api, "sampleGames" would be replaced
    // by the result of calling this button -- the 
    // games from the specified player with the correct
    // number of games

    // for now, default game mode is blitz
    let fetchedGames = []
    let numGamesToFetch = numGames
    if (gamesList.length + numGames >= MAX_NUM_GAMES) {
      numGamesToFetch = MAX_NUM_GAMES - gamesList.length
      setMaxGamesReached(true)
    }
    publicRequest.get(`/games?username=${username}&max=${numGamesToFetch}&prefType=${variant}`)
      .then((result) => {
        console.log('successfully found games')
        fetchedGames = result.data
        const editedGamesList = fetchedGames.map(item => ({
          ...item,
          playingAs: username,
          playingAsColor: item.players.white.user.name === username ? 'white' : 'black'
        }))
       
        setGamesList((prev) => [...prev, ...editedGamesList])
        
        
        if (fetchedGames.length > 0) {
          setNoGamesFound(false)
        } else {
          setNoGamesFound(true)
        }
        // check if same player's game is getting added multiple times
        if (!playersList.includes(username)) {
          setPlayersList(prev => [...prev, username])
        }
        setLoadingGames(false)
      }).catch (e => {
        console.log(e)
      })
  }

  // when use creates collection
  const onClick = (e) => {  
    e.preventDefault()
    setLoadingCollection(true)
    testInstance.post(`/collection/${currentUser._id}`, { 
      gamesList, 
      name: collectionName,  
      userId: currentUser._id,
      numGames: gamesList.length,
      playersList: playersList,
      isPublic: isPublic,
      username: currentUser.username,
      timesPlayed: 1 
    })
    .then((result) => {
      console.log('successfully posted collection')
      history.push(`/practice/${result.data._id}`)
      console.log('second')
      return <Redirect to={`/practice/${result.data._id}`} />
      // return <Redirect exact to={`/practice/${result.data._id}`} />
      // now: redirect to practice tool with the id of this collection
      // or should I just pass this in? no because you want to make
      // the collection page general
    })
    .catch((e) => {
      console.log('could not save collection: ' + e)
    })
  }

  const onDeleteGame = (id) => {
    console.log(gamesList)
    setGamesList(gamesList.filter((game, i) => i !== id))
    if (gamesList.length - 1 < MAX_NUM_GAMES) {
      setMaxGamesReached(false)
    }
  }

  return (
    <>
    <Navbar />
    <div className="section">
      <div className="container">
        <div className="card has-background-light mb-6">
          <div className="card-content">
            <span className="icon-text is-size-3 is-size-4-mobile mb-5">
              <span className="icon mr-4">
                <FontAwesomeIcon icon={faChessKnight} size="" />
              </span>
              <span className="has-text-weight-medium mb-2">
                Find Games
              </span>
            </span>
            
            <FilterPanel 
              setGamesList={setGamesList} 
              setPlayingAs={setPlayingAs}
              setUsername={setUsername}
              setNumGames={setNumGames}
              setVariant={setVariant}
              onFindGamesClick={onFindGamesClick}
              loadingGames={loadingGames}
              username={username}
            />
            <SearchFilterPanel 
              setGamesList={setGamesList}
              setPlayingAs={setPlayingAs}
              setUsername={setUsername}
              setVariant={setVariant}
              setNumGames={setNumGames}
              onFindGamesClick={onFindGamesClick}
              loadingGames={loadingGames}
            />
          </div>
        </div>
      </div>

      <div className="container">
        {maxGamesReached && <p>Max number of games reached</p>}
        {loadingGames && <p>Loading games ...</p>}
        {(noGamesFound && !loadingGames) && <Error>No games found. Try again with different parameters</Error>}

        <div className="columns is-multiline">
          {gamesList.map((item,index) => (
            <div className="column is-one-thirds-widescreen is-half-tablet is-full-mobile">
              <GamePreview 
                game={item} 
                playingAs={item.playingAs} 
                key={index} id={index} 
                createdAt={item.createdAt}
                onDeleteGame={onDeleteGame}/>
            </div>
            
          ))}
        </div>

        {gamesList.length > 0 &&
          <div className="mt-6">
            <VisibilitySection>
              <Visibility>
                <Select 
                  className="mb-2"
                  name="privacy" 
                  onChange={(e) => e.target.value === 'public' ? setIsPublic(true) : setIsPublic(false)} 
                >
                  <Option value="private">private</Option>
                  <Option value="public">public</Option>
                </Select>
              </Visibility>
              
            </VisibilitySection>
            <div className="columns">
              <div className="column is-two-thirds">
                <div className="columns is-gapless">
                  <div className="column">
                    <input 
                      className="input" 
                      style={{"borderRadius": "0px"}} 
                      placeholder="collection name" 
                      value={collectionName}
                      onChange={(e) => {
                        if (e.target.value.length < 30) {
                          setCollectionName(e.target.value)
                        }
                      }}
                    />
                  </div>
                  <div className="column">
                    <button 
                      className="button is-success" 
                      style={{"borderRadius": "0px"}} 
                      onClick={onClick} 
                      disabled={loadingCollection}
                    >
                      Make Collection
                    </button>
                  </div>
                </div>
                </div>
              </div>
          </div>
        }
        </div>
      </div>
    </>
  )
}

export default withRouter(MakeCollection)

