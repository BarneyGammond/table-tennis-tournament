import React from 'react'
import {Container, ListGroup} from 'react-bootstrap'

export default ({players}) => {

    return (

        <Container>

            <ListGroup>

                { players.map((player,i) => (

                    <ListGroup.Item key={i}>{player}</ListGroup.Item>

                ))}

            </ListGroup>

        </Container>

    )

}