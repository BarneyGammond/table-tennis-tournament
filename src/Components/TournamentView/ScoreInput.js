import React from 'react'
import {Container,Form,Button}  from  'react-bootstrap'

export default ({p1Name,p2Name,display}) => {

    let styling = {
        display: display,
        position: 'absolute',
        backgroundColor: 'rgba(46,46,49,0.5)'
    }

    return (
        <Container style={styling}>

            <Form>
            
                <Form.Group>
                    <Form.Label>{p1Name} Score</Form.Label>
                    <Form.Control type='number'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{p2Name} Score</Form.Label>
                    <Form.Control type='number'></Form.Control>
                </Form.Group>
                <Button>Submit Score</Button>

            </Form>

        </Container>
    )

}