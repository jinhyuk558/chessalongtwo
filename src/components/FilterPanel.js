
import { useState } from "react"
import styled from "styled-components"
import Filter from "./Filter"
import { sampleGames } from '../sampleGames'

const Container = styled.div`
  margin-bottom: 35px;
`
const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 35px;
`
const Subtitle = styled.h2`
  font-weight: 500;
`
const Button = styled.button`
font-size: 15px;
cursor: pointer;
border: none;
background-color: #3B444F;
color: white;
padding: 5px 10px;
border-radius: 3px;
`

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
      <Subtitle>Choose from pre-selected players</Subtitle>
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
