import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CollectionPreview from "../components/CollectionPreview";
import Navbar from "../components/Navbar";
import { publicRequest } from "../services/makeRequest";

const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 15px 60px;
`
const Heading = styled.p`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 15px !important;
`

// basically the dashboard
const HomePage = () => {

  const [popularCollections, setPopularCollections] = useState([])

  useEffect(() => {
    publicRequest.get('/collection/sorted/popular')
      .then(result => {
        console.log(result.data)
        setPopularCollections(result.data)
      })
      .catch(e => console.log('error retrieving popular collections'))
  },[])

  return (
    <>
      <Navbar />
      <div className="section">
        <div className="container">
          <p className="title">Popular Public Collections</p>
          <div className="columns is-multiline">
            {popularCollections && 
              popularCollections.map(item => 
                <div className="column is-one-quarter">
                  <CollectionPreview key={item._id} collection={item} />
                </div>)
            }
          </div>
        </div>
       </div>
    </>
  )
}

export default HomePage


