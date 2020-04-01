import React from 'react'
import {Container} from 'react-bootstrap'

export default ({players}) => {

    return (

        <Container>

            <ul className="playerList">

                { players.map((player,i) => (

                    <li className="playerListName" key={i}><h4>{player}</h4></li>

                ))}

            </ul>

        </Container>

    )

}