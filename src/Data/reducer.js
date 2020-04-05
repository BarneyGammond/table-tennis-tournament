import history from '../history'
import axios from './axios'

const addPlayers = (state,{playerList}) => {

    // Maps out each player object for state from list of names

    const newPlayerList = playerList.map((player,i) => (

        {
            id: i+1,
            name: player.name,
            wins: 0,
            pointsWon: 0,
            pointsConceded: 0,
            eliminated: false,
            hof: player.hof,
            hofID: player.hofID
        }

    ))

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

    //Then finds all players that have not been eliminated

    let activePlayers = players.filter(player => player.eliminated === false)

    let x = 2
    let y = 0
    let result = 0

    //The function below determines the qualifying games that need to be played if
    //there is an irregular number of players

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

    //If the function finds excess then the new round will include qualifiers

    let qualifiers = findExcess(activePlayers.length)

    console.log(`the number of active players is ${activePlayers.length}`)
    console.log(`the excess result is ${qualifiers}`)

    const numOfMatches = qualifiers ? qualifiers : activePlayers.length/2

    //The excess function or the number of playerds left then determines how many new games are created

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

    //Below is the logic for changing the match to played and adding the scores

    let newRounds = [...state.rounds]

    newRounds[roundIndex][matchIndex] = {
        ...newRounds[roundIndex][matchIndex],
        played: true,
        p1Score,
        p2Score
    }

    //We then find the indexes of the winner and the loser in the players array

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
    
    //The loser is updated with eliminated and their points are also updated
    //The winner receives an extra win and has their points updated

    let newPlayerList = [...state.players]

    newPlayerList[loserIndex] = {
        ...newPlayerList[loserIndex],
        eliminated: true,
        pointsWon: newPlayerList[winnerIndex].pointsWon + (p1Score < p2Score ? p1Score : p2Score),
        pointsConceded: newPlayerList[winnerIndex].pointsConceded + (p1Score > p2Score ? p1Score : p2Score)
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
    //If so it sets allMatchesPlayed to true so that a new round won't be triggered

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

        return {
            ...state,
            winner: players.find(player => player.id === winnerID),
            runnerUp : players.find(player => player.id === loserID)
        }

    }

    //It will only return results if the tournament is complete

    return tournamentComplete ? tournamentResults() : state

}

const hallOfFame = state => {

    //The functions below update the hall of fame stats

    const {winner} = state
    
    console.log(winner)

    const hallOfFamer = () => {

        axios.get(`/players/${winner.hofID}`)
        .then(({data}) => {
            console.log(data)
            axios.put(`/players/${winner.hofID}`, {
                tournaments_won: data.tournaments_won + 1,
                points_won: data.points_won + winner.pointsWon,
                points_conceded: data.points_conceded + winner.pointsConceded
            }).then((data) => {console.log(data)})
        })

    }

    const rookie = () => {

        axios.post('/players', {
            name: winner.name,
            tournaments_won: 1,
            points_won: winner.pointsWon,
            points_conceded: winner.pointsConceded
        })

    }

    //If the winner wsa already in the database then their stats are updated otherwise
    //the new player is added

    winner.hof ? hallOfFamer() : rookie()

    return({...state})

}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return allocateMatches(shuffle(addPlayers(state,action)))
        case "RESULT_ENTRY": return (
            hallOfFame(finalResults(allocateMatches(matchesPlayed(updateResult(state,action)))))
        )
        default: return state

    }

}

export default reducer;