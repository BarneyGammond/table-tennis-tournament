import React from 'react'
import ResultCard from './ResultCard'
import {Container} from 'react-bootstrap'

export default ({players}) => {

    console.log(players);

    //Finds the player which has not been eliminated

    const winner = players[players.findIndex(player => !player.eliminated)]

    return (

        <Container>
            <ResultCard title='The Winner' playerName={winner.name} />
            <ResultCard title='Runner-up' playerName='' />
        </Container>

    )

}