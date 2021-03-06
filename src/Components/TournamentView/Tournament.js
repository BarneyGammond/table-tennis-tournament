import React from 'react'
import TournamentRound from './TournamentRound'
import {Container} from 'react-bootstrap'

export default ({rounds,handleResult,players}) => {

    const playerCount = players.length

    //Each round is rendered whether complete or not

    //Dependent on the number of matches in the round it will be given a different title
    //such as qualifier, semi-final etc.

    return (

        <Container className="tournamentWrapper">

            { rounds.map((round,roundIndex) => { 

                const matchNumber = round.length
                let roundTitle = `Round of ${matchNumber*2}`

                if (matchNumber !== playerCount/2 && roundIndex === rounds.length - 1) {

                    roundTitle = 'Qualifiers'

                } else if (matchNumber === 4) {

                    roundTitle = 'Quarter-finals'

                } else if (matchNumber === 2) {

                    roundTitle = 'Semi-finals'

                } else if (matchNumber === 1) {

                    roundTitle = 'Final'    

                }

                return (
                    <TournamentRound
                        key={roundIndex} 
                        round={round} 
                        handleResult={handleResult} 
                        roundIndex={roundIndex}
                        roundTitle={roundTitle}  
                    />
                )

            })}

        </Container>

    )

}