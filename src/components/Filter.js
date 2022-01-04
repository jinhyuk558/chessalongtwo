
import styled from "styled-components"

const Select = styled.select`
  margin-right: 10px;
  height: 40px;
  font-size: 17px;
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 4px;
  color: 	#363636;
`
const Option = styled.option`
height: 40px;
font-size: 17px;
`
const Label = styled.label``

const Filter = ({ 
  setPlayer, setNumGames, setVariant, 
  loadingGames, username, onFindGamesClick }) => {
  
  return (
    <div className="container">
      <Select name="player" id="id-player" onChange={(e) => setPlayer(e.target.value)}>
        <Option value="RealDavidNavara">GM RealDavidNavara</Option>  
        <Option value="mutdpro">IM mutdpro</Option>
        <Option value="friendlyfish">friendlyfish</Option>
        <Option value="Zhigalko_Sergei">GM Zhigalko_Sergei</Option>
      </Select>
      
      <Select name="numGames" id="id-games" onChange={(e) => setNumGames(e.target.value)}>
        <Option value="10">10 Games</Option>
        <Option value="20">20 Games</Option>
      </Select>

      <Select name="variant" id="id-variant" onChange={(e) => setVariant(e.target.value)}>
        <Option value="rapid">rapid</Option>
        <Option value="blitz">blitz</Option>
      </Select>

      <div className="container">
        <p className="is-size-6 mt-3" style={{"color": "gray"}}>
          (Note: rapid games are recommended for better game quality)
        </p>
        <button 
          className="button is-primary mt-1 mb-6" 
          disabled={loadingGames} 
          onClick={(e) => {
            console.log('Response: ' + document.getElementById('id-player').value)
            setPlayer(document.getElementById('id-player').value)
            setNumGames(document.getElementById('id-games').value)
            setVariant(document.getElementById('id-variant').value)  
            onFindGamesClick(e)
          }}
        >
          Find Games
        </button>
      </div>
    </div>
  )
}

export default Filter