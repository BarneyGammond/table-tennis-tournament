import React , {useState} from 'react'
import {Container} from 'react-bootstrap'
import ScoreInput from './ScoreInput'

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

    const [scoreDisplay,setScoreDisplay] = useState('none')

    const handleClick = () => {

        return played ? null : setScoreDisplay('block')
            
    }

    const submitScore = (p1Score,p2Score) => {

        let winner = p1Score > p2Score ? player1ID : player2ID
        let loser = p1Score < p2Score ? player1ID : player2ID

        setScoreDisplay('none')

        return onWinnerClick(loser,winner,matchIndex,roundIndex)

    }

    return (

        <>

        <Container onClick={handleClick} className="tournamentCard" style={played ? {opacity: 0.75} : null}>

            {/* On click the opposite players id is handed up as the function looks
            to receive the player to eliminate*/}

            {/* The key is passed down as the match id*/}

            <h4>{player1}</h4>
            <h4>VS</h4>
            <h4>{player2}</h4>

        </Container>

        <ScoreInput 
            p1Name={player1} 
            p2Name={player2} 
            display={scoreDisplay}
            submitScore={submitScore} 
        />

        </>

    )

}