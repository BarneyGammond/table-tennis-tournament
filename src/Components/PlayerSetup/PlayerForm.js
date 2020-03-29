import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'

export default () => {

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Enter Names Here</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Name
                </Button>
            </Form>
        </Container>
        
    )

}