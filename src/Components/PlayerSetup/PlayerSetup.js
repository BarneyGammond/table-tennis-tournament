import React ,{useState} from 'react'
import PlayerForm from './PlayerForm'
import PlayerList from  './PlayerList'
import {Container,Row,Button} from 'react-bootstrap'
import HallOfFame from './HallOfFame'

const PlayerSetup = ({handleSubmit}) => {

    //The player list is held in state here

    const [playerList, setPlayerList] = useState([])

    const addPlayer = (playerName,hof,hofID) => {

        // This add player function is passed down through props to the form

        setPlayerList([...playerList,{name:playerName,hof,hofID}])

    }

    //Once all the players needed have been added to the list the start tournament button
    //will move the user on to the tournament view and render the first matches

    return (
        <Container>
            <PlayerForm addPlayer={addPlayer} />
            <PlayerList players={playerList} />
            <Row className="justify-content-center">
                { playerList.length >= 2 
                    ? <Button onClick={() => handleSubmit(playerList)}>Start Tournament</Button>
                    : null
                }
            </Row>
            <HallOfFame addPlayer={addPlayer} />
        </Container>
        
    )

}

export default PlayerSetup