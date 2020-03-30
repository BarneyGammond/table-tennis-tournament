import React from 'react'
import {Container} from 'react-bootstrap'

export default ({player1,player2}) => {

    return (

        <Container className="tournamentCard">

            <h4>{player1}</h4>
            <h4>VS</h4>
            <h4>{player2}</h4>

        </Container>

    )

}