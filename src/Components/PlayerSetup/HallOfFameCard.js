import React from 'react'
import {Container} from 'react-bootstrap'

export default ({playerData,addPlayer}) => {

    console.log(playerData)

    const {id,name,tournaments_won,points_won,points_conceded} = playerData

    return (
        <Container>

            <h3>{name}</h3>
            <p>Tournaments Won: {tournaments_won}</p>
            <p>Points Won {points_won}</p>
            <p>Points Conceded {points_conceded}</p>
            <button onClick={() => addPlayer(name,true,id)}>Add Player To Tournament</button>

        </Container>

    )

}