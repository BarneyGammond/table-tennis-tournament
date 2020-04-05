import React from 'react'
import TournamentCard from './TournamentCard'
import {Container} from 'react-bootstrap'

export default ({round,handleResult,roundIndex,roundTitle}) => {

    //Within the tournament round, each match is rendered

    //Information such as the match index and round index need to be passed down so the matches
    //can be played in any order

    return (

        <Container>

            <h3>{roundTitle}</h3>

            <div className="cardWrapper">

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

            </div>

        </Container>

    )

}