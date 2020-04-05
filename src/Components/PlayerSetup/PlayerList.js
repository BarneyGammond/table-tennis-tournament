import React from 'react'
import {Container} from 'react-bootstrap'

export default ({players}) => {

    console.log(players)

    //Renders a list of the players in PlayerSetup local state using array.map

    return (

        <Container>

            <ul className="playerList">

                { players.map((player,i) => (

                    <li className="playerListName" key={i}><h4>{player.name}</h4></li>

                ))}

            </ul>

        </Container>

    )

}