
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: 10px;
`
const Select = styled.select`
  margin-right: 10px;
`
const Option = styled.option``
const Label = styled.label``

const Filter = ({ setPlayer, setNumGames }) => {
  return (
    <Container>
      
      <Label htmlFor="player">Choose player </Label>
      <Select name="player" onChange={(e) => setPlayer(e.target.value)}>
        <Option value="mutdpro">mutdpro</Option>
        <Option value="friendlyfish">friendlyfish</Option>
      </Select>

      <Label htmlFor="numGames">Number of games </Label>
      <Select name="numGames" onChange={(e) => setNumGames(e.target.value)}>
        <Option value="10">10</Option>
        <Option value="20">20</Option>
      </Select>
      
    </Container>
  )
}

export default Filter