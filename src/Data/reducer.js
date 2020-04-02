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

    return {
        ...state,
        rounds: [
            newRound,
            ...state.rounds,
        ],
        allMatchesPlayed: false,
    }

}

const updateResult = (state,{matchIndex,roundIndex,p1Score,p2Score}) => {

    //Below is the logic for changing the match played

    let newRounds = [...state.rounds]

    newRounds[roundIndex][matchIndex] = {
        ...newRounds[roundIndex][matchIndex],
        played: true,
        p1Score,
        p2Score
    }

   /*  newRounds[roundIndex][matchIndex].played = true

    newRounds[roundIndex][matchIndex].winner = winnerID

    newRounds[roundIndex][matchIndex].p1Score = p1Score */
    //Below is the logic for changing the player eliminated

    let loserIndex = (p1Score < p2Score 
        ? state.players.findIndex(player => 
            player.id === newRounds[roundIndex][matchIndex].p1.id
        )
        : state.players.findIndex(player => 
            player.id === newRounds[roundIndex][matchIndex].p2.id
        )
    )

    let winnerIndex = (p1Score > p2Score 
        ? state.players.findIndex(player => 
            player.id === newRounds[roundIndex][matchIndex].p1.id
        )
        : state.players.findIndex(player => 
            player.id === newRounds[roundIndex][matchIndex].p2.id
        )
    )
    
    console.log(`Player 1 scored ${p1Score} points`)
    console.log(`Player 2 scored ${p2Score} points`)
    console.log(`The winner index is ${winnerIndex}`)
    console.log(`The loser index is ${loserIndex}`)
    

    let newPlayerList = [...state.players]

    newPlayerList[loserIndex] = {
        ...newPlayerList[loserIndex],
        eliminated: true,
        pointsWon: newPlayerList[winnerIndex].pointsWon + p1Score < p2Score ? p1Score : p2Score,
        pointsConceded: newPlayerList[winnerIndex].pointsConceded + p1Score > p2Score ? p1Score : p2Score
    }
    newPlayerList[winnerIndex] = {
        ...newPlayerList[winnerIndex],
        wins: newPlayerList[winnerIndex].wins + 1,
        pointsWon: newPlayerList[winnerIndex].pointsWon + p1Score > p2Score ? p1Score : p2Score,
        pointsConceded: newPlayerList[winnerIndex].pointsConceded + p1Score < p2Score ? p1Score : p2Score
    }

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

        const winnerID = final.p1Score > final.p2Score ? final.p1.id : final.p2.id
        const loserID = final.p1Score < final.p2Score ? final.p1.id : final.p2.id

        //Identifies the losers id based on the winners i

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