import { useState } from "react"
import styled from "styled-components"
import FilterPanel from "../components/FilterPanel"
import GamePreview from "../components/GamePreview"
import { publicRequest } from '../makeRequest'
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { withRouter } from "react-router-dom"


const Container = styled.div``
const Button = styled.button`
  margin-top: 20px;
`
const Input = styled.input``
const Notice = styled.span`
  margin-bottom: 10px;
`
const Loading = styled.h4``
const Select = styled.select``
const Option = styled.option``

const MakeCollection = () => {

  const [gamesList, setGamesList] = useState([])
  const [playingAs, setPlayingAs] = useState('')
  const [username, setUsername] = useState('mutdpro')
  const [numGames, setNumGames] = useState(10)
  const [loadingGames, setLoadingGames] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const currentUser = useSelector(state => state.currentUser)
  // this is an array of the players featured in this collection
  const [playersList, setPlayersList] = useState([])
  const [isPublic, setIsPublic] = useState(false)
  const history = useHistory()
  
  const onFindGamesClick = (e) => {

    e.preventDefault()
    setLoadingGames(true)
        
    // with the api, "sampleGames" would be replaced
    // by the result of calling this button -- the 
    // games from the specified player with the correct
    // number of games

    // for now, default game mode is blitz
    let fetchedGames = []
    publicRequest.get(`/games?username=${username}&max=${numGames}&prefType=blitz`)
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
    publicRequest.post(`/collection`, { 
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
    <Container>
      <Navbar />
      <FilterPanel 
        setGamesList={setGamesList} 
        setPlayingAs={setPlayingAs}
        setUsername={setUsername}
        setNumGames={setNumGames}
        onFindGamesClick={onFindGamesClick}
        loadingGames={loadingGames}
      />
      <Notice>(The below games will be used in the new collection)</Notice>
      <Loading>{loadingGames && 'Loading games ...'}</Loading>
      {gamesList.map((item,index) => (  
          <GamePreview game={item} playingAs={item.playingAs} key={index} id={index} onDeleteGame={onDeleteGame}/>
      ))}
      <Select 
        name="privacy" 
        onChange={(e) => e.target.value === 'public' ? setIsPublic(true) : setIsPublic(false)} 
      >
        <Option value="private">private</Option>
        <Option value="public">public</Option>
      </Select>
      <Input placeholder="collection name" onChange={(e) => setCollectionName(e.target.value)}/>
      <Button onClick={onClick}>Make Collection</Button>
    </Container>
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