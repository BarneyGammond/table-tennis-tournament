import React from 'react'
import TournamentCard from './TournamentCard'
import {Container} from 'react-bootstrap'

export default ({rounds,handleResult}) => {

    let round = rounds[0]

    return (

        <Container className="tournamentWrapper">

            { round.map((match,matchIndex) => (

                <TournamentCard 
                    onWinnerClick={handleResult}
                    played={match.played}
                    key={matchIndex}
                    roundIndex={0}
                    matchIndex={matchIndex}
                    player1={ match.p1.name }
                    player2={ match.p2.name }
                    player1ID={match.p1.id}
                    player2ID={match.p2.id}  
                />

            )) }

        </Container>

    )

}