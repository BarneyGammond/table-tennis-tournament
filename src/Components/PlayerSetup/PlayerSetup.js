import React ,{useState} from 'react'
import PlayerForm from './PlayerForm'
import PlayerList from  './PlayerList'
import {Container,Row,Button} from 'react-bootstrap'

const PlayerSetup = ({handleSubmit}) => {

    //The player list is held in state here

    const [playerList, setPlayerList] = useState([])

    const addPlayer = (playerName) => {

        // This add player function is passed down through props to the form

        setPlayerList([...playerList,playerName])

    }

    return (
        <Container>
            <PlayerForm addPlayer={addPlayer} />
            <PlayerList players={playerList} />
            <Row className="justify-content-center">
                <Button onClick={() => handleSubmit(playerList)}>Start Tournament</Button>
            </Row>
        </Container>
        
    )

}

export default PlayerSetup