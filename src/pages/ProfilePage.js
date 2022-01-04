import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CollectionPreview from "../components/CollectionPreview";
import Navbar from "../components/Navbar";
import { publicRequest, testInstance } from "../services/makeRequest";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfilePage = () => {
  const user = useSelector(state => state.currentUser)
  const dateObject = user && new window.Date(user.createdAt)
  const dateText = dateObject ? 'Signed up on ' + dateObject.toDateString() : 'Loading...'
  
  // state
  const [userCollections, setUserCollections] = useState([])
  const [isUnauthenticated, setIsUnauthenticated] = useState(false)

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

  useEffect(() => {
    testInstance.get(`/collection/user/${user._id}`)
      .then(result => {
        setUserCollections(result.data)
        console.log('Below is the users collections')
        console.log(result.data)
      })
      .catch(e => setIsUnauthenticated(true))
  },[user])

  return (
    <>
      <Navbar />
      {isUnauthenticated ? 
        <p className="mt-5 ml-6">You are not authenticated</p> :
        
      
        <div className="section">
          {
            user ? 
            <div className="container">
              <span class="icon-text is-size-3 has-text-weight-semibold mb-3">
                <span class="icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span >{user.username}</span>
              </span>
              <p className="subtitle is-size-6">{dateText}</p>
              <span className="is-size-4 mt-4 mb-3 has-text-weight-medium">Collections</span>
              <div className="">
                <table class="table">
                  <thead>
                    <tr>
                      <th><FontAwesomeIcon icon={faBook} className="mr-2" />Name</th>
                      <th># Games</th> 
                      <th>Date</th>
                      <th>Players</th>
                      <th>Practice</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {userCollections.length > 0 ?
                      userCollections.map(item => 
                        <CollectionPreview key={item._id} collection={item} viewerIsUser={true} />) 
                        :
                      <div className="container mt-4">Currently Empty</div>
                    }
                  </tbody>
                </table>
              </div>
              
            </div>
            : <p className="is-size-5"></p>

          }
        </div>
      }
    </>
  )
}

export default ProfilePage

