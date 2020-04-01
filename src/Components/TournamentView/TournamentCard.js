import React from 'react'
import {Container} from 'react-bootstrap'

export default ({
    onWinnerClick,
    player1,
    player2,
    player1ID,
    player2ID,
    matchIndex,
    roundIndex,
    played,
}) => {

    const handleClick = (playerNumber) => {

        //This ensure the losers id is passed on

        const loserID = playerNumber === 1 ? player2ID : player1ID
        const winnerID = playerNumber === 1 ? player1ID : player2ID

        return played 
            ? null
            : onWinnerClick(loserID,winnerID,matchIndex,roundIndex)
            
    }

    return (

        <Container className="tournamentCard" style={played ? {opacity: 0.5} : null}>

            {/* On click the opposite players id is handed up as the function looks
            to receive the player to eliminate*/}

            {/* The key is passed down as the match id*/}

            <h4 onClick={() => handleClick(1)}>{player1}</h4>
            <h4>VS</h4>
            <h4 onClick={() => handleClick(2)}>{player2}</h4>

        </Container>

    )

}