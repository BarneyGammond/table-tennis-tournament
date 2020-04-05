import React from 'react'
import ResultCard from './ResultCard'
import {Container} from 'react-bootstrap'

export default ({winner,runnerUp}) => {

    //The results page receives the winner and runner up and renders them in result cards
    //Further result could be added by calling other player names through mapStateToProps

    return (

        <Container className="resultsWrapper">
            <ResultCard title='The Winner' playerName={winner.name} />
            <ResultCard title='Runner-up' playerName={runnerUp.name} />
        </Container>

    )

}