
import { Redirect, withRouter, useHistory } from "react-router-dom"
import { publicRequest } from "../services/makeRequest"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMediaQuery } from 'react-responsive'


const CollectionPreview = (
  { collection: { name, createdAt, numGames, playersList, _id, timesPlayed, username, isPublic }, 
  viewerIsUser }) => {

  const history = useHistory()
  const tempDate = new window.Date(createdAt)
  const dateText = (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()

  const isWidescreen = useMediaQuery({ query: '(max-width: 1432px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 562px)' })
  const shortenedPlayersList = playersList.slice(0, 2)

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
        <td>
          {name}
        </td>
        <td>
          {numGames} {!isWidescreen && 'games'}
        </td>
        
        {!isTablet &&
        <td className={!viewerIsUser ? 'hide' : ''}>
          {dateText}
        </td>
        }
        {!viewerIsUser && <td>{timesPlayed}</td>}
        {!viewerIsUser && <td>{username}</td>}
        
        <td className={!viewerIsUser ? 'hide' : ''}>
           {shortenedPlayersList.map(item => <>{item}&nbsp;</>)}
        </td>
        
        <td>
          <a className="is-size-6" onClick={onClick}>Practice</a>
        </td>
        
      </tr>
  )
}

export default withRouter(CollectionPreview)


