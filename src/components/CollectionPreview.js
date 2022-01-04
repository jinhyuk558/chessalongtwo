
import { Redirect, withRouter, useHistory } from "react-router-dom"
import { publicRequest } from "../services/makeRequest"


const CollectionPreview = (
  { collection: { name, createdAt, numGames, playersList, _id, timesPlayed, username }, 
  viewerIsUser }) => {

  const history = useHistory()
  const tempDate = new window.Date(createdAt)
  const dateText = (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()

  const onClick = (e) => {
    e.preventDefault()
    console.log('clicked')
    // Increment # of times played
    publicRequest.put(`/collection/increment/${_id}`)
      .then(result => console.log('Incremented'))
      .catch(e => console.log('Error incrementing'))
    history.push(`/practice/${_id}`)
  }
  
  return (
      <tr>
        <td>{name}</td>
        <td>
          {numGames} games
        </td>
        
        <td>
          {dateText}
        </td>
        {!viewerIsUser && <td>{timesPlayed}</td>}
        {!viewerIsUser && <td>{username}</td>}
        
        <td>
           {playersList.map(item => <>{item}&nbsp;</>)}
        </td>
        
        <td>
          <a className="is-size-6" onClick={onClick}>Practice</a>
        </td>
      </tr>
  )
}

export default withRouter(CollectionPreview)


