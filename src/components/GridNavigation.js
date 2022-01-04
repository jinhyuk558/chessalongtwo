
import { useEffect } from "react"
import styled from "styled-components"
import GridBox from "./GridBox"

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`


const GridNavigation = ({ completedGames, onGridClick, currentIndex }) => {
 
  return (
    <div className="card mt-2">
      <div className="card-content">
        <p className="is-size-4 has-text-weight-semibold mb-1">Progress</p>
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
      </div>
    </div>
  )
}

export default GridNavigation


