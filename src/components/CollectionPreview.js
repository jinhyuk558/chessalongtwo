
import { Redirect, withRouter, useHistory } from "react-router-dom"
import styled from "styled-components"
import { publicRequest } from "../services/makeRequest"

const Container = styled.div`
  margin-bottom: 30px;
`
const Heading = styled.div`
  font-size: 23px;
  font-weight: 500;
`
const Date = styled.p`
  font-size: 15px;
  color: #747474;
  
`
const Detail = styled.p`
  font-size: 15px;
  color: #747474;
  margin-bottom: 2px;

`
const Player = styled.span`
  margin-right: 5px;
  color: #747474;
`
const Button = styled.button`
  font-size: 15px;
  cursor: pointer;
  border: none;
  background-color: #3B444F;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
`

const Bold = styled.p`
  font-weight: 500;
`



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
      <Date>{`Created At - ${(new window.Date(createdAt)).toDateString()}`}</Date>
      {playersList && 
        <Detail>
          Players - {` `}
          {playersList.map(item => <Player key={item}>{item}</Player>)}
        </Detail>
      }
      <Detail>{numGames} Games</Detail>
      <Button onClick={onClick}>Practice</Button>
    </Container>
  )
}

export default withRouter(CollectionPreview)