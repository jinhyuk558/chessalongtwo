import { useState } from "react"
import styled from "styled-components"
import FilterPanel from "../components/FilterPanel"
import GamePreview from "../components/GamePreview"
import { publicRequest } from '../makeRequest'


const Container = styled.div``
const Button = styled.button`
  margin-top: 20px;
`
const Input = styled.input``
const Notice = styled.span`
  margin-bottom: 10px;
`
const Loading = styled.h4``

const MakeCollection = () => {

  const [gamesList, setGamesList] = useState([])
  const [playingAs, setPlayingAs] = useState('')
  const [username, setUsername] = useState('mutdpro')
  const [numGames, setNumGames] = useState(10)
  const [loadingGames, setLoadingGames] = useState(false)
  
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
        setLoadingGames(false)
      }).catch (e => {
        console.log(e)
      })
  }

  return (
    <Container>
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
          <GamePreview game={item} playingAs={item.playingAs} key={index}/>
      ))}
      
      <Input placeholder="collection name"/>
      <Button>Make Collection</Button>
    </Container>
  )
}

export default MakeCollection


// I'll be needing Redux for the user, but NOT
// for collections or the collectoin that has 
// just been created. These can be loaded whenever
// they are needed. For example, for practice mode
// they will be loaded based on the id, for viewing
// all collections, they will be loaded with an API
// call in a similar way.