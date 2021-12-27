import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CollectionPreview from "../components/CollectionPreview";
import Navbar from "../components/Navbar";
import { publicRequest } from "../makeRequest";

const Container = styled.div`
`
const Heading = styled.h2``

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
    <Container>
      <Navbar />

      <Heading>Popular Public Collections</Heading>
      {
        popularCollections ? 
        popularCollections.map(item => <CollectionPreview key={item._id} collection={item} />) :
        ''
      }
    </Container>
  )
}

export default HomePage