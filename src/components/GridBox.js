import styled from "styled-components"

const Box = styled.div`
display: flex;
justify-content: center;
align-items: center;
border: 2px solid #77dd77;
background-color: ${props => props.completed ? '#77dd77' : 'none'};
width: 40px;
height: 40px;
margin-bottom: 5px;
margin-right: 5px;
font-
`

const GridBox = ({ completed, id, onClickBehavior }) => {
  return (
    <Box completed={completed} onClick={onClickBehavior} id={id}>
      {(id+1)}  
    </Box>
  )
}

export default GridBox