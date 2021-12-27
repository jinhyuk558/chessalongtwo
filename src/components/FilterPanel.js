
import { useState } from "react"
import styled from "styled-components"
import Filter from "./Filter"
import { sampleGames } from '../sampleGames'

const Container = styled.div`
  margin-bottom: 20px;
`
const Title = styled.h2`
  margin-bottom: 10px;
`
const Subtitle = styled.h3``
const Button = styled.button``

const FilterPanel = ({ setGamesList, setPlayingAs, setUsername, setNumGames, onFindGamesClick, loadingGames, setVariant }) => {

  // Reminder of how this component works
  // in case I forget: user enters in filters
  // and clicks "Find Games." Then, games
  // satisfying those filters are populated 
  // below the filters. Meaning the user
  // can click "Find Games" multiple times using
  // different paramters. When the user is satisfied
  // they can click "Create Collection" to start
  // playing.


  return (
    <Container>
      <Title>Filter Panel</Title>
      <Subtitle>Top Players</Subtitle>
      <Filter 
        setPlayer={setUsername}
        setNumGames={setNumGames}
        setVariant={setVariant}
      />
      <Button disabled={loadingGames} onClick={onFindGamesClick}>Find Games</Button>
    </Container>
  )
  
}

export default FilterPanel
