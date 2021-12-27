
import { useEffect } from "react"
import styled from "styled-components"
import GridBox from "./GridBox"

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 15px;
  margin-top: 10px;
  max-width: 65%;
`
const Title = styled.h3`
  margin-bottom: 5px;
`
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

// #77dd77
// maybe change green here

const GridNavigation = ({ completedGames, onGridClick, currentIndex }) => {



  useEffect(() => {

  },[])
 
  return (
    <Container>
      <Title>Progress</Title>
      <Grid>
        {completedGames.map((isCompleted, i) => 
          <GridBox 
            completed={isCompleted} 
            key={i}
            id={i}
            onClickBehavior={(e, i) => {
              e.preventDefault()
              console.log('Grid Index: ' + e.target.id)
              onGridClick(e.target.id)
            }}
            currentIndex={currentIndex}
          />)
        }
      </Grid>
    </Container>
  )
}

export default GridNavigation


