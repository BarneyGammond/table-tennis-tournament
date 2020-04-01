import React from 'react'
import TournamentRound from './TournamentRound'
import {Container} from 'react-bootstrap'

export default ({rounds,handleResult}) => {

    return (

        <Container className="tournamentWrapper">

            { rounds.map((round,roundIndex) => { 

                return (
                    <TournamentRound 
                        round={round} 
                        handleResult={handleResult} 
                        roundIndex={roundIndex}  
                    />
                )

            })}

        </Container>

    )

}