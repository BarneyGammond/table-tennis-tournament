import React ,{useState,useEffect} from 'react'
import axios from '../../Data/axios'
import { Container } from 'react-bootstrap'
import HallOfFameCard from './HallOfFameCard'

export default ({addPlayer}) => {

    const [apiData,setApiData] = useState([])

    useEffect(() => {

        
        axios.get('/players').then(({ data }) => {

        
            setApiData(data);

        
        })


    }, [setApiData])

    console.log(apiData)

    return(

        <Container>

            { apiData.map((player,i) => (

                <HallOfFameCard addPlayer={addPlayer} key={i} playerData={player}/>

            )) }

        </Container>

    )

}