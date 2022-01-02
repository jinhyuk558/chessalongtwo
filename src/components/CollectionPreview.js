
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
      <div className="card">
        <div className="card-content">
          <p className="is-size-5 has-text-weight-semibold	">{name}</p>
          <p className="is-size-6">
            {`Created ${(new window.Date(createdAt)).toDateString()}`}
          </p>
          <p className="is-size-6">
            Players - {playersList.map(item => `${item} `)}
            
          </p>
          <p className="is-size-6">
            {numGames} Games
          </p>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">
            <span>
              <a className="is-size-5" onClick={onClick}>Practice</a>
            </span>
          </p>
        </footer>
        
      </div>
  )
}

export default withRouter(CollectionPreview)

/*
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
    */