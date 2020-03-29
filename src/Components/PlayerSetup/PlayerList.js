import React from 'react'
import {Container} from 'react-bootstrap'

export default ({players}) => {

    return (

        <Container>

            <ul>

                { players.map((player,i) => (

                    <li key={i}>{player}</li>

                ))}

            </ul>

        </Container>

    )

}