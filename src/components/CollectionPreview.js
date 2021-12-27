
import { Redirect, withRouter, useHistory } from "react-router-dom"
import styled from "styled-components"
import { publicRequest } from "../makeRequest"

const Container = styled.div`
  margin-bottom: 15px;
`
const Heading = styled.div`
  font-size: 20px;
  font-weight: 500;
`
const Detail = styled.p``
const Player = styled.span`
  margin-right: 5px;
  font-weight: 700;
`
const Button = styled.button``



const CollectionPreview = ({ collection: { name, createdAt, numGames, playersList, _id } }) => {

  const history = useHistory()

  const onClick = (e) => {
    e.preventDefault()
    console.log('clicked')
    // Increment # of times played
    publicRequest.put(`/collection/increment/${_id}`)
      .then(result => console.log('Incremented'))
      .catch(e => console.log('Error incrementing'))
    history.push(`/practice/${_id}`)
    //return <Redirect to={`/practice/${_id}`} />
  }
  
  return (
    <Container>
      <Heading>{name}</Heading>
      {playersList && 
        <Detail>
          Player(s): 
          {playersList.map(item => <Player key={item}>{item}</Player>)}
        </Detail>
      }
      <Detail>{`Created At - ${(new window.Date(createdAt)).toDateString()}`}</Detail>
      <Detail>{numGames} Games</Detail>
      <Button onClick={onClick}>Practice</Button>
    </Container>
  )
}

export default withRouter(CollectionPreview)