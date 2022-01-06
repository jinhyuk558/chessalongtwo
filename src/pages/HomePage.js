import { useState } from "react";
import { useEffect } from "react";
import CollectionPreview from "../components/CollectionPreview";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { faStar, faTrophy, faBolt, faFrog, faEye, faBook, faSearch, faShare } from "@fortawesome/free-solid-svg-icons";
import { publicRequest, testInstance } from "../services/makeRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useMediaQuery} from 'react-responsive'


const HomePage = () => {

  const [popularCollections, setPopularCollections] = useState([])
  const [topBlitzUsernames, setTopBlitzUsernames] = useState([])
  const [userCollections, setUserCollections] = useState([])
  const [topRapidUsernames, setTopRapidUsernames] = useState([])
  const [blitzSelected, setBlitzSelected] = useState(true)
  const user = useSelector(state => state.currentUser)

  const isWidescreen = useMediaQuery({ query: '(max-width: 1432px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 562px)' })

  useEffect(() => {
    publicRequest.get('/collection/sorted/popular')
      .then(result => {
        console.log(result.data)
        setPopularCollections(result.data)
      })
      .catch(e => console.log('error retrieving popular collections'))
  },[])

  useEffect(() => {
    publicRequest.get('/leaderboards?variant=blitz')
      .then(result => {
        console.log(result.data)
        setTopBlitzUsernames(result.data)
      })
      .catch(e => console.log('error retrieving top blitz usernames'))
  },[])

  useEffect(() => {
    publicRequest.get('/leaderboards?variant=rapid')
      .then(result => {
        console.log(result.data)
        setTopRapidUsernames(result.data)
      })
      .catch(e => console.log('error retrieving top rapid usernames'))
  },[])

  useEffect(() => {
    testInstance.get(`/collection/user/${user._id}`)
      .then(result => {
        let data = result.data
        data.reverse()
        data = data.slice(0, 5)
        setUserCollections(data)
      })
      .catch(e => console.log('could not get this users collection'))
  },[topRapidUsernames])

  return (
    <div style={{"display": "flex", "minHeight": "100vh", "flexDirection": "column"}}>
      <Navbar />
      <div className="section" style={{"flex": "1"}}>
        <div className="container">
          <div className="columns">

            <div className="column is-two-thirds">
              <div className="card ">
                <div className="card-content">
                  <span class="icon-text is-size-3 mb-5 has-text-weight-bold">
                    {!isTablet &&
                    <span class="icon mr-3">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    }
                    <p >Popular Public Collections</p>
                  </span>
                  <table class="table ">
                    <thead>
                      <tr>
                        <th><FontAwesomeIcon icon={faBook} className="mr-2" />Name</th>
                        <th># {!isWidescreen && 'Games'}</th> 
                        <th className="hide">Date</th>
                        <th> 
                          <abbr title="Times played"><FontAwesomeIcon icon={faEye} /></abbr>
                        </th>
                        <th>Created by</th>
                        <th className="hide">Players</th>
                        <th>Practice</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {popularCollections && 
                        popularCollections.map(item => 
                          <CollectionPreview 
                            key={item._id} 
                            collection={item} 
                            viewerIsUser={false} 
                          />)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          <div className="column is-one-thirds">
            <span class="icon-text is-size-4 mb-5 has-text-weight-bold">
              <span class="icon mr-3">
                <FontAwesomeIcon icon={faTrophy} />
              </span>
              <p className="">Top Players</p>
            </span>
            <article class="panel is-primary">
              <p class="panel-tabs">
                <a className={blitzSelected && 'is-active'} onClick={(e) => {
                  e.preventDefault()
                  setBlitzSelected(true)
                }}>
                  <FontAwesomeIcon icon={faBolt} className="mr-1" />
                  Blitz
                </a>
                <a className={!blitzSelected && 'is-active'} onClick={(e) => {
                  e.preventDefault()
                  setBlitzSelected(false)
                }}>
                  <FontAwesomeIcon icon={faFrog} className="mr-1" />  
                  Rapid
                </a>
              </p>
              {
                blitzSelected ?
                topBlitzUsernames.map((username, i) => (
                  <a class="panel-block is-active">
                    <span class="panel-icon">
                      <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    <strong>{i+1}</strong>&nbsp; {username}
                  </a>
                ))
                : 
                topRapidUsernames.map((username, i) => (
                  <a class="panel-block is-active">
                    <span class="panel-icon">
                      <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    <strong>{i+1}</strong>&nbsp; {username}
                  </a>
                ))
              }

            </article>
            </div>   
          </div>

          <div className="div">
              <div className="columns">
                <div className="column is-two-thirds">
                  <div className="card ">
                    <div className="card-content">
                      <p className="is-size-4 mb-5 has-text-weight-bold" >Recently Added by You</p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th><FontAwesomeIcon icon={faBook} className="mr-2" />Name</th>
                            <th># {!isWidescreen && 'Games'}</th> 
                            {!isTablet && <th>Date</th>}
                            <th>Players</th>
                            <th>Practice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userCollections && 
                            userCollections.map(item => 
                              <CollectionPreview 
                                key={item._id} 
                                viewerIsUser={true} 
                                collection={item} 
                                viewerIsUser={true} 
                              />)
                          }
                          {userCollections.length === 0 && <p className="mt-3">(List is empty!)</p>}
                        </tbody>
                      </table>
                      <Link className="navbar-item" to="/make">
                        <button className="button is-info is-light is-medium">
                          Create New
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage



