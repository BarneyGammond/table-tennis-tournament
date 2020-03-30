
const addPlayers = (state,{playerList}) => {

    // variable below is a formatted version of the player names for the state

    const newPlayerList = playerList.map((player,i) => {

        return {

            id: i+1,
            name: player,
            wins: 0,
            pointsWon: 0,
            pointsConceded: 0,
            eliminated: false

        }

    })

    return {

        ...state,
        players: newPlayerList

    }

}

const shuffle = state => {

    //I used a method called the Fisher-Yates shuffle to randomise this

    let array = state.players

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
        players: array

    }

}

const allocateMatches = (state) => {

    let playerPosition = 0
    const players = state.players
    let matches = []

    for (let i=0 ; i<4 ; i+=1) {

        matches.push({

            id: i+1,
            p1: players[playerPosition],
            p2: players[playerPosition+1],
            played: false,
            
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

const updateResult = (state,{playerID,matchIndex,roundIndex}) => {

    //Below is the logic for changing the match played

    console.log(state.rounds)

    let newRounds = [...state.rounds]

    console.log(newRounds[roundIndex])

    newRounds[roundIndex][matchIndex].played = true

    //Below is the logic for changing the player eliminated

    let index = state.players.findIndex(player => player.id === playerID)

    let newPlayerList = [...state.players]

    newPlayerList[index].eliminated = true

    return {
        ...state,
        rounds: newRounds,
        players: newPlayerList,
    }

}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return allocateMatches(shuffle(addPlayers(state,action)))
        case "RESULT_ENTRY": return updateResult(state,action) 
        default: return state

    }

}

export default reducer;