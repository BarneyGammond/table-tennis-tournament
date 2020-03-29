import React, {useState} from 'react'
import {Form, Button, Container} from 'react-bootstrap'

export default ({addPlayer}) => {

    const [playerName,setPlayerName] = useState('')

    const handleChange = e => {

        setPlayerName(e.currentTarget.value)

    }

    const handleSubmit = e => {

        e.preventDefault()

        addPlayer(playerName)

        setPlayerName('')

    }

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Enter Names Here</Form.Label>
                    <Form.Control onChange={handleChange} value={playerName}></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Add Name
                </Button>
            </Form>
        </Container>
        
    )

}