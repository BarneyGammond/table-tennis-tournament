import React from 'react'
import ResultCard from './ResultCard'
import {Container} from 'react-bootstrap'

export default ({winner,runnerUp}) => {

    return (

        <Container className="resultsWrapper">
            <ResultCard title='The Winner' playerName={winner.name} />
            <ResultCard title='Runner-up' playerName={runnerUp.name} />
        </Container>

    )

}