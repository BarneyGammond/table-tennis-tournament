
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
        players: newPlayerList

    }

}


const reducer = (state,action) => {

    switch(action.type) {

        case "ADD_PLAYERS": return addPlayers(state,action)
        default: return state

    }

}

export default reducer;