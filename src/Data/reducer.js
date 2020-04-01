import history from '../history'

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
    //or the tournament is finished

    if (!state.allMatchesPlayed || state.tournamentComplete) return {...state}

    let playerPosition = 0
    const players = state.players
    let newRound = []

    let activePlayers = players.filter(player => player.eliminated === false)

    let x = 2
    let y = 0
    let result = 0

    let findExcess = (num) => {
    
        let next = () => {
            y = x
            x *= 2
            findExcess(num)
        }
        
        let excess = () => {
            return !(num - x) ? 0 : num - y
        }
    
        num > x ? next() : result = excess()

        return result
    
    }

    let qualifiers = findExcess(activePlayers.length)

    console.log(`the number of active players is ${activePlayers.length}`)
    console.log(`the excess result is ${qualifiers}`)

    //Checks that the players have not been eliminated

    const numOfMatches = qualifiers ? qualifiers : activePlayers.length/2

    for (let i=0 ; i<numOfMatches ; i+=1) {

        newRound.push({

            id: i+1,
            p1: activePlayers[playerPosition],
            p2: activePlayers[playerPosition+1],
            played: false,
            
        })

        playerPosition += 2

    }

    console.log(newRound)

    return {
        ...state,
        rounds: [
            newRound,
            ...state.rounds,
        ],
        allMatchesPlayed: false,
    }

}

const updateResult = (state,{loserID,winnerID,matchIndex,roundIndex}) => {

    //Below is the logic for changing the match played

    let newRounds = [...state.rounds]

    newRounds[roundIndex][matchIndex].played = true

    newRounds[roundIndex][matchIndex].winner = winnerID

    //Below is the logic for changing the player eliminated

    let index = state.players.findIndex(player => player.id === loserID)

    let newPlayerList = [...state.players]

    newPlayerList[index].eliminated = true

    //Below is to check if that was the last game

    let checkElims = newPlayerList.filter(player => !player.eliminated).length

    let final = checkElims === 1

    return {
        ...state,
        rounds: newRounds,
        players: newPlayerList,
        tournamentComplete: final
    }

}

const matchesPlayed = state => {

    //Checks if all the matches in the round have been played

    let round = state.rounds[0]

    return round.find(match => !match.played) 
        ? {...state}  
        : {
            ...state,
            allMatchesPlayed : true
        } 
}

const finalResults = state => {

    let {tournamentComplete,rounds,players} = state;

    let tournamentResults = () => {

        history.push('./results')

        //Identifies the final from the rounds array

        const final = rounds[0][0]

        console.log(final)

        const winnerID = final.winner

        //Identifies the losers id based on the winners id

        let loserID = final.p1.id === winnerID ? final.p2.id : final.p1.id

        return {
            ...state,
            winner: players.find(player => player.id === winnerID),
            runnerUp : players.find(player => player.id === loserID)
        }

    }

    return tournamentComplete ? tournamentResults() : state

}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return allocateMatches(shuffle(addPlayers(state,action)))
        case "RESULT_ENTRY": return (
            finalResults(allocateMatches(matchesPlayed(updateResult(state,action))))
        )
        default: return state

    }

}

export default reducer;