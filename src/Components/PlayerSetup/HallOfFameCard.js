import React from 'react'
import {Container} from 'react-bootstrap'

export default ({playerData}) => {

    console.log(playerData)

    const {name,tournaments_won,points_won,points_conceded} = playerData

    return (
        <Container>

            <h3>{name}</h3>
            <p>Tournaments Won: {tournaments_won}</p>
            <p>Points Won {points_won}</p>
            <p>Points Conceded {points_conceded}</p>

        </Container>

    )

}