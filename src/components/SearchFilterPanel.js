
import styled from "styled-components"
import { useState } from "react"


const Select = styled.select`
  margin-right: 10px;
  height: 40px;
  font-size: 17px;
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 4px;
`
const Option = styled.option``

const SearchFilterPanel = ({ setUsername, setNumGames, 
  setVariant, onFindGamesClick }) => {

  const [emptyUsername, setEmptyUsername] = useState(true)

  return (
    // add blitz/rapid icons later
    <div className="container">
      <div className="container mb-3">
        <p className="is-size-4 is-size-5-tablet is-size-5-mobile has-text-weight-medium">Search players</p>
        <input 
          className="input mr-2" 
          name="search" 
          style={{"width": "30%"}}
          placeholder="player username" onChange={(e) => {
            setUsername(e.target.value)
            if (e.target.value.length === 0) {
              setEmptyUsername(true)
            } else {
              setEmptyUsername(false)
            }
          }}
          />
        <Select name="variant" onChange={(e) => {
          setVariant(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="blitz">blitz</Option>
          <Option value="rapid">rapid</Option>
        </Select>
        <Select name="numGames" onChange={(e) => {
          setNumGames(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="10">10 Games</Option>
          <Option value="20">20 Games</Option>
        </Select>
      </div>
  
      <p className="is-size-6 mb-1" style={{"color": "gray"}}>
        (Note: only games from 2200+ retrieved)
      </p>
      <button 
        className="button is-primary  mb-6" 
        onClick={onFindGamesClick}
      >
        Find Games
      </button>
    </div>
  )
}

export default SearchFilterPanel
