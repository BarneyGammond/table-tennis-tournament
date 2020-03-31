
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

    //This checks if all the matches in the round have been played

    if (!state.allMatchesPlayed) return {...state}

    let playerPosition = 0
    const players = state.players
    let newRound = []

    //Checks that the players have not been eliminated
    
    let activePlayers = players.filter(player => player.eliminated === false)

    for (let i=0 ; i<activePlayers.length/2 ; i+=1) {

        newRound.push({

            id: i+1,
            p1: activePlayers[playerPosition],
            p2: activePlayers[playerPosition+1],
            played: false,
            
        })

        playerPosition += 2

    }

    return {
        ...state,
        rounds: [
            ...state.rounds,
            newRound
        ],
        allMatchesPlayed: false,
        currentRound: state.currentRound + 1
    }

}

const updateResult = (state,{playerID,matchIndex,roundIndex}) => {

    //Below is the logic for changing the match played

    let newRounds = [...state.rounds]

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

//Checks if all the matches in the round have been played

const matchesPlayed = state => {

    let round = state.rounds[state.currentRound - 1]

    return round.find(match => !match.played) 
        ? {...state}  
        : {
            ...state,
            allMatchesPlayed : true
        } 
}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return allocateMatches(shuffle(addPlayers(state,action)))
        case "RESULT_ENTRY": return allocateMatches(matchesPlayed(updateResult(state,action)))
        default: return state

    }

}

export default reducer;