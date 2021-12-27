import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CollectionPreview from "../components/CollectionPreview";
import Navbar from "../components/Navbar";
import { publicRequest } from "../makeRequest";

const Container = styled.div``
const Title = styled.h1``
const Date = styled.div`
  margin-bottom: 10px;
`
const Heading = styled.h3`
  margin-bottom: 5px;
`

const ProfilePage = () => {
  const user = useSelector(state => state.currentUser)
  const dateObject = user && new window.Date(user.createdAt)
  const dateText = dateObject ? 'Signed up on ' + dateObject.toDateString() : 'Loading...'
  
  // state
  const [userCollections, setUserCollections] = useState([])

  /*
   publicRequest.get(`/collection/${collectionId}`)
    .then((result) => {
      setCollection(result.data)
      setGameMoves(result.data.gamesList[gameIndex].moves.split(' '))
      console.log('Moves: ' + collection.gamesList[gameIndex].moves.split(' '))
      setPlayingAsColor(
        collection.gamesList[gameIndex].playingAsColor
      )
    })
    .catch((e) => console.log('could not get collection'))
    */

    // now: first test getting collecti in postman then do it here

  useEffect(() => {
    publicRequest.get(`/collection/user/${user._id}`)
      .then(result => {
        setUserCollections(result.data)
        console.log('Below is the users collections')
        console.log(result.data)
      })
      .catch(e => console.log('could not get this users collection'))
  },[user])
  return (
    <Container>
      <Navbar />
      {user ? 
        <div>
          <Title>{user.username}</Title>
          <Date>{dateText}</Date>
          <Heading>Collections</Heading>
          {
            userCollections.map(item => <CollectionPreview collection={item} key={item._id} />)
          }
        </div>
        
      
      
      : 'Loading ...'
      }
      
      
    </Container>
  )
}

export default ProfilePage