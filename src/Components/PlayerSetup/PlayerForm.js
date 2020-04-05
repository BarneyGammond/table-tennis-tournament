import React, {useState} from 'react'
import {Form, Button, Container, Row} from 'react-bootstrap'

export default ({addPlayer}) => {

    //The name is typed in here and then saved in PlayerSetup.js local state through the
    //addPlayer prop

    const [playerName,setPlayerName] = useState('')

    const handleChange = e => {

        setPlayerName(e.currentTarget.value)

    }

    const handleSubmit = e => {

        //Here the addPlayer function is called and the player Name is reset

        e.preventDefault()

        if (playerName) addPlayer(playerName, false)

        setPlayerName('')

    }

    return (
        <Container className="playerInput my-2">
            <Form>
                <Form.Group>
                    <Form.Label>Enter Names Here</Form.Label>
                    <Form.Control onChange={handleChange} value={playerName}></Form.Control>
                </Form.Group>
                <Row className="justify-content-center">
                    <Button 
                        onClick={handleSubmit} 
                        variant="primary" 
                        type="submit"
                        >Add Name
                    </Button>
                </Row>
            </Form>
        </Container>
        
    )

}