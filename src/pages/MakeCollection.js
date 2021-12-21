import { useState } from "react"
import styled from "styled-components"
import FilterPanel from "../components/FilterPanel"
import GamePreview from "../components/GamePreview"


const Container = styled.div``
const Button = styled.button`
  margin-top: 20px;
`
const Input = styled.input``
const Notice = styled.span``

const MakeCollection = () => {

  const [gamesList, setGamesList] = useState([])
  const [playingAs, setPlayingAs] = useState('')
  
  

  return (
    <Container>
      <FilterPanel 
        setGamesList={setGamesList} 
        setPlayingAs={setPlayingAs}
      />
      <Notice>(The below games will be used in the new collection)</Notice>
      
      {gamesList.map((item,index) => (
          <GamePreview game={item} playingAs={item.playingAs} key={index}/>
        ))
      }
      
      <Input placeholder="collection name"/>
      <Button>Make Collection</Button>
    </Container>
  )
  
}

export default MakeCollection


// I'll be needing Redux for the user, but NOT
// for collections or the collectoin that has 
// just been created. These can be loaded whenever
// they are needed. For example, for practice mode
// they will be loaded based on the id, for viewing
// all collections, they will be loaded with an API
// call in a similar way.