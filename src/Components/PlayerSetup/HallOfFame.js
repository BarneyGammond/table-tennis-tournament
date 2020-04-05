import React ,{useState,useEffect} from 'react'
import axios from '../../Data/axios'
import { Container } from 'react-bootstrap'
import HallOfFameCard from './HallOfFameCard'

export default ({addPlayer}) => {

    const [apiData,setApiData] = useState([])

    //Use effect allows a call to be made to the database for the hall of fame players

    useEffect(() => {

        
        axios.get('/players').then(({ data }) => {

        
            setApiData(data);

        
        })


    }, [setApiData])

    console.log(apiData)

    //Hall of fame players are then rendered out as cards

    return(

        <Container className="cardWrapper">

            { apiData.map((player,i) => (

                <HallOfFameCard addPlayer={addPlayer} key={i} playerData={player}/>

            )) }

        </Container>

    )

}