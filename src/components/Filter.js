
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 10px;
  margin-top: 5px;
`
const Select = styled.select`
  margin-right: 10px;
  height: 30px;
`
const Option = styled.option``
const Label = styled.label``

const Filter = ({ setPlayer, setNumGames, setVariant }) => {
  return (
    <Container>
      <Label htmlFor="player">Player: </Label>
      <Select name="player" onChange={(e) => setPlayer(e.target.value)}>
        <Option value="mutdpro">mutdpro</Option>
        <Option value="friendlyfish">friendlyfish</Option>
      </Select>
      
      <Label htmlFor="numGames">Number of games: </Label>
      <Select name="numGames" onChange={(e) => setNumGames(e.target.value)}>
        <Option value="10">10</Option>
        <Option value="20">20</Option>
      </Select>

      <Label htmlFor="variant">Variant </Label>
      <Select name="variant" onChange={(e) => setVariant(e.target.value)}>
        <Option value="blitz">blitz</Option>
        <Option value="rapid">rapid</Option>
      </Select>
    </Container>
  )
}

export default Filter