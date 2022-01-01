
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"


const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  border-bottom: 1px solid black;
`
const Title = styled.h2`
  margin-bottom: 5px;
  font-weight: 500;
`
const Button = styled.button`
  width: 100px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  background-color: #3B444F;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 15px;
`
const SearchSection = styled.div`
  margin-bottom: 10px;
`
const VariantSection = styled.div`
  margin-bottom: 5px;
`
const NumGamesSection = styled.div`
  margin-bottom: 5px;
`
const SearchBar = styled.input`
  width: 150px;
  padding: 5px 10px;
  margin-right: 10px;
`
const Notice = styled.p`
  font-size: 15px;
  margin-bottom: 10px;
`
const Select = styled.select`
  height: 30px;
  margin-right: 10px;
`
const Option = styled.option``
const NumGamesLabel = styled.label``

const SearchFilterPanel = ({ setUsername, setNumGames, setVariant, onFindGamesClick }) => {

  const [emptyUsername, setEmptyUsername] = useState(true)

  return (
    // add blitz/rapid icons later
    <Container>
      <Title>Find by Search</Title>
      <SearchSection>
        <SearchBar name="search" placeholder="player username" onChange={(e) => {
          setUsername(e.target.value)
          if (e.target.value.length === 0) {
            setEmptyUsername(true)
          } else {
            setEmptyUsername(false)
          }
        }} />
        <NumGamesLabel htmlFor="variant">Variant: </NumGamesLabel>
        <Select name="variant" onChange={(e) => {
          setVariant(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="blitz">blitz</Option>
          <Option value="rapid">rapid</Option>
        </Select>
        <NumGamesLabel htmlFor="numGames">Number of Games: </NumGamesLabel>
        <Select name="numGames" onChange={(e) => {
          setNumGames(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
        </Select>
      </SearchSection>
     
      <Notice>(Note: only games from 2200+ retrieved)</Notice>
      <Button disabled={emptyUsername} onClick={onFindGamesClick}>Find Games</Button>
    </Container>
  )
  
}

export default SearchFilterPanel
