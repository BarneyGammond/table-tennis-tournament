import React from 'react'
import {Container} from 'react-bootstrap'

export default ({onWinnerClick,player1,player2,player1ID,player2ID,matchIndex,roundIndex}) => {

    return (

        <Container className="tournamentCard">

            {/* On click the opposite players id is handed up as the function looks
            to receive the player to eliminate*/}

            {/* The key is passed down as the match id*/}

            <h4 onClick={() => onWinnerClick(player2ID,matchIndex,roundIndex)}>{player1}</h4>
            <h4>VS</h4>
            <h4 onClick={() => onWinnerClick(player1ID,matchIndex,roundIndex)}>{player2}</h4>

        </Container>

    )

}