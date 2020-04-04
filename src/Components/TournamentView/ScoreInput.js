import React, {useState} from 'react'
import {Container,Form,Button}  from  'react-bootstrap'

export default ({p1Name,p2Name,display,submitScore}) => {

    let styling = {
        display: display,
    }

    let [p1Score,setp1Score] = useState('')
    let [p2Score,setp2Score] = useState('')

    const handleChange = (e,player) => {

        let score = e.currentTarget.valueAsNumber

        player === 'p1' ? setp1Score(score)
            : setp2Score(score)

        console.log(score);
        console.log(score)

    }

    const handleClick = () => {

        const submit = () => {
            submitScore(p1Score,p2Score);
            setp1Score('');
            setp2Score('');
        }

        p1Score >= 21 || p2Score >= 21 
            ? submit()
            : alert('One of the players must have scored at least 21 points to win')

    }

    return (
        <Container className='scoreForm' style={styling}>

            <Form>
            
                <Form.Group>
                    <Form.Label className="text-light">{p1Name} Score</Form.Label>
                    <Form.Control 
                        placeholder='0'
                        onChange={(e) => handleChange(e,'p1')}
                        value={p1Score}
                        type='number'>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-light">{p2Name} Score</Form.Label>
                    <Form.Control 
                        placeholder='0'
                        onChange={(e) => handleChange(e,'p2')}
                        value={p2Score}
                        type='number'></Form.Control>
                </Form.Group>

                <Button onClick={handleClick}>Submit Score</Button>

            </Form>

        </Container>
    )

}