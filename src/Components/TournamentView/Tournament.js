import React from 'react'
import TournamentCard from './TournamentCard'
import {Container} from 'react-bootstrap'

export default ({rounds}) => {

    console.log(rounds)

    let round = rounds[0]

    return (

        <Container className="tournamentWrapper">

            { round.map((match,i) => (

                <TournamentCard 
                    key={i}
                    player1={ match.p1.name }
                    player2={ match.p2.name } 
                />

            )) }

        </Container>

    )

}