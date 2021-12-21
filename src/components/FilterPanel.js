
import { useState } from "react"
import styled from "styled-components"
import Filter from "./Filter"
import { sampleGames } from '../sampleGames'

const Container = styled.div`
  margin-bottom: 20px;
`
const Title = styled.h2``
const Button = styled.button``

const FilterPanel = ({ setGamesList, setPlayingAs }) => {

  // Reminder of how this component works
  // in case I forget: user enters in filters
  // and clicks "Find Games." Then, games
  // satisfying those filters are populated 
  // below the filters. Meaning the user
  // can click "Find Games" multiple times using
  // different paramters. When the user is satisfied
  // they can click "Create Collection" to start
  // playing.

  const [player, setPlayer] = useState('mutdpro')
  const [numGames, setNumGames] = useState(10)

  return (
    <Container>
      <Title>Filter Panel</Title>
      <Filter 
        setPlayer={setPlayer}
        setNumGames={setNumGames}
      />
      <Button onClick={(e) => {
        e.preventDefault()
        
        // with the api, "sampleGames" would be replaced
        // by the result of calling this button -- the 
        // games from the specified player with the correct
        // number of games
        const editedGamesList = sampleGames.map(item => ({
          ...item,
          playingAs: player,
          playingAsColor: item.players.white.user.name === player ? 'white' : 'black'
        }))
        console.log(editedGamesList)
        setGamesList((prev) => [...prev, ...editedGamesList])
        setPlayingAs(player)
      }}>Find Games</Button>

    </Container>
  )
  
}

export default FilterPanel