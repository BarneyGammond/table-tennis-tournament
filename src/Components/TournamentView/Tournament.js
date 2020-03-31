import React from 'react'
import TournamentCard from './TournamentCard'
import {Container} from 'react-bootstrap'

export default ({rounds,handleResult}) => {

    return (

        <Container className="tournamentWrapper">

            { rounds.map((round,roundIndex) => (

                <Container key={roundIndex} className="cardWrapper">

                    { round.map((match,matchIndex) => (

                        <TournamentCard 
                            onWinnerClick={handleResult}
                            played={match.played}
                            key={matchIndex}
                            roundIndex={roundIndex}
                            matchIndex={matchIndex}
                            player1={ match.p1.name }
                            player2={ match.p2.name }
                            player1ID={match.p1.id}
                            player2ID={match.p2.id}  
                        />

                    ))}

                </Container>

            ))}

        </Container>

    )

}