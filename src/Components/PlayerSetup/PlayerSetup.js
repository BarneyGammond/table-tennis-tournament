import React ,{useState} from 'react'
import PlayerForm from './PlayerForm'

const PlayerSetup = () => {

    const [playerList, setPlayerList] = useState([])

    const addPlayer = (playerName) => {

        setPlayerList([...playerList,playerName])

    }

    return (
        
        <PlayerForm addPlayer={addPlayer} />
        
    )

}

export default PlayerSetup