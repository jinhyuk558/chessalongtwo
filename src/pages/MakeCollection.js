import { useState } from "react"
import styled from "styled-components"
import FilterPanel from "../components/FilterPanel"
import GamePreview from "../components/GamePreview"
import { publicRequest, testInstance, userRequest } from '../services/makeRequest'
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { withRouter } from "react-router-dom"
import SearchFilterPanel from "../components/SearchFilterPanel"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 60px;

`
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
const Notice = styled.span`
  margin-bottom: 15px;
`
const Loading = styled.h4`
  margin-bottom: 15px;
`
const MakeCollectionSection = styled.div`
  margin-top: 20px;
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

  height: 30px;
`
const Option = styled.option``
const Error = styled.p`
  color: red;
`

const MakeCollection = () => {

  const [gamesList, setGamesList] = useState([])
  const [playingAs, setPlayingAs] = useState('')
  const [username, setUsername] = useState('mutdpro')
  const [numGames, setNumGames] = useState(10)
  const [variant, setVariant] = useState('blitz')
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
  
  const onFindGamesClick = (e) => {

    e.preventDefault()
    setLoadingGames(true)
        
    // with the api, "sampleGames" would be replaced
    // by the result of calling this button -- the 
    // games from the specified player with the correct
    // number of games

    // for now, default game mode is blitz
    let fetchedGames = []
    publicRequest.get(`/games?username=${username}&max=${numGames}&prefType=${variant}`)
      .then((result) => {
        console.log('successfully found games')
        console.log(result)
        fetchedGames = result.data
        const editedGamesList = fetchedGames.map(item => ({
          ...item,
          playingAs: username,
          playingAsColor: item.players.white.user.name === username ? 'white' : 'black'
        }))
        console.log('edited games: ' + editedGamesList)
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
    testInstance.post(`/collection`, { 
      gamesList, 
      name: collectionName,  
      userId: currentUser._id,
      numGames: gamesList.length,
      playersList: playersList,
      isPublic: isPublic,
      timesPlayed: 1 
    })
    .then((result) => {
      console.log('successfully posted collection')
      console.log(result.data)
      history.push(`/practice/${result.data._id}`)
      console.log('second')
      return <Redirect to={`/practice/${result.data._id}`} />
      //history(`/practice/${result.data._id}`)
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
    setGamesList(gamesList.filter((game, i) => i !== id))
  }

  return (
    <>
    <Navbar />
    <Container>
      <FilterPanel 
        setGamesList={setGamesList} 
        setPlayingAs={setPlayingAs}
        setUsername={setUsername}
        setNumGames={setNumGames}
        setVariant={setVariant}
        onFindGamesClick={onFindGamesClick}
        loadingGames={loadingGames}
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


      {gamesList.length > 0 &&<Notice>(The below games will be used in the new collection)</Notice>}
      {loadingGames && <Loading>Loading games ...</Loading>}
      {noGamesFound && <Error>No games found. Try again with different parameters</Error>}

      {gamesList.map((item,index) => (  
          <GamePreview game={item} playingAs={item.playingAs} key={index} id={index} onDeleteGame={onDeleteGame}/>
      ))}

      {
        gamesList.length > 0 &&
        <MakeCollectionSection>
          <VisibilitySection>
            <Visibility>
              <Label htmlFor='privacy'>Visibility: </Label>
              <Select 
                name="privacy" 
                onChange={(e) => e.target.value === 'public' ? setIsPublic(true) : setIsPublic(false)} 
              >
                <Option value="private">private</Option>
                <Option value="public">public</Option>
              </Select>
            </Visibility>
            
            (Users with collection ID will still be able to interact with this collection)
          </VisibilitySection>
          <Input placeholder="collection name" onChange={(e) => setCollectionName(e.target.value)}/>
          <Button  onClick={onClick} disabled={loadingCollection}>Make Collection</Button>
        </MakeCollectionSection>
      }
      
    </Container>
      
    </>
  )
}

export default withRouter(MakeCollection)


// I'll be needing Redux for the user, but NOT
// for collections or the collectoin that has 
// just been created. These can be loaded whenever
// they are needed. For example, for practice mode
// they will be loaded based on the id, for viewing
// all collections, they will be loaded with an API
// call in a similar way.