
import { useState } from "react"
import styled from "styled-components"
import Filter from "./Filter"
import { sampleGames } from '../sampleGames'

const FilterPanel = ({ 
  setGamesList, setPlayingAs, setUsername, 
  username, setNumGames, onFindGamesClick, loadingGames, setVariant }) => {

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
    <div className="container">
      <p className="is-size-4 is-size-5-tablet is-size-5-mobile has-text-weight-medium">
        Choose from pre-selected players
      </p>
      <Filter 
        setPlayer={setUsername}
        setNumGames={setNumGames}
        setVariant={setVariant}
        loadingGames={loadingGames}
        onFindGamesClick={onFindGamesClick}
        username={username}
      />
    </div>
  )
}

export default FilterPanel
