
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"


const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  margin-bottom: 5px;
`
const Button = styled.button`
  width: 80px;
`
const SearchSection = styled.div`
  margin-bottom: 5px;
`
const NumGamesSection = styled.div`
  margin-bottom: 5px;
`
const SearchBar = styled.input`
  width: 150px;
`
const Notice = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
`
const Select = styled.select``
const Option = styled.option``
const NumGamesLabel = styled.label``

const SearchFilterPanel = ({ setUsername, setNumGames, setVariant, onFindGamesClick }) => {

  const [emptyUsername, setEmptyUsername] = useState(true)

  return (
    // add blitz/rapid icons later
    <Container>
      <Title>Find by Search</Title>
      <SearchSection>
        <SearchBar placeholder="player username" onChange={(e) => {
          setUsername(e.target.value)
          if (e.target.value.length === 0) {
            setEmptyUsername(true)
          } else {
            setEmptyUsername(false)
          }
        }} />
        <Select name="variant" onChange={(e) => {
          setVariant(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="blitz">blitz</Option>
          <Option value="rapid">rapid</Option>
        </Select>
      </SearchSection>
      <NumGamesSection>
        <NumGamesLabel htmlFor="numGames">Number of Games: </NumGamesLabel>
        <Select name="numGames" onChange={(e) => {
          setNumGames(e.target.value)
          console.log(e.target.value)
        }}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
        </Select>
      </NumGamesSection>
      <Notice>(Note: only games from 2200+ retrieved)</Notice>
      <Button disabled={emptyUsername} onClick={onFindGamesClick}>Find Games</Button>
    </Container>
  )
  
}

export default SearchFilterPanel
