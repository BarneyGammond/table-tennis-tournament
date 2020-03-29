
const addPlayers = (state,{playerList}) => {

    // variable below is a formatted version of the player names for the state

    const newPlayerList = playerList.map((player,i) => {

        return {

            id: i+1,
            name: player,
            wins: 0,
            pointsWon: 0,
            pointsConceded: 0,

        }

    })

    return {

        ...state,
        activePlayers: newPlayerList

    }

}

const shuffle = state => {

    //I used a method called the Fisher-Yates shuffle to randomise this

    let array = state.activePlayers

    let length = array.length
    let placeholder = 0
    let i = 0

    while (length) {

        i = Math.floor(Math.random() * length--)

        placeholder = array[length]
        array[length] = array[i]
        array[i] = placeholder

    }

    return {

        ...state,
        activePlayers: array

    }

}

const allocateMatches = (state) => {

    let playerPosition = 0
    const players = state.activePlayers
    let matches = []

    for (let i=0 ; i<4 ; i+=1) {

        matches.push({

            id: i+1,
            p1: players[playerPosition],
            p2: players[playerPosition+1],
            played: false,
            winner: null
            
        })

        playerPosition += 2

    }

    return {
        ...state,
        rounds: [
            ...state.rounds,
            matches
        ]
    }

}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return allocateMatches(shuffle(addPlayers(state,action)))
        default: return state

    }

}

export default reducer;