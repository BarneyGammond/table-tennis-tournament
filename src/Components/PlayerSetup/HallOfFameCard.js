import React from 'react'
import {Container, Button} from 'react-bootstrap'

export default ({playerData,addPlayer}) => {

    //The hall of fame cards are given the addPlayer prop so that they will be able to add to the
    //playerList

    const {id,name,tournaments_won,points_won,points_conceded} = playerData

    return (
        <Container className="hallOfFameCard">

            <h3>{name}</h3>
            <p>Tournaments Won: {tournaments_won}</p>
            <p>Points Won {points_won}</p>
            <p>Points Conceded {points_conceded}</p>
            <Button onClick={() => addPlayer(name,true,id)}>Add Player To Tournament</Button>

        </Container>

    )

}