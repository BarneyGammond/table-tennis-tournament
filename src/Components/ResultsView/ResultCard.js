import React from 'react'
import {Container} from 'react-bootstrap'

export default ({title,playerName}) => {

   return (

        <Container className="resultCard">
            <h3>{title}</h3>
            <h3>{playerName}</h3> 
        </Container>

    )

}
