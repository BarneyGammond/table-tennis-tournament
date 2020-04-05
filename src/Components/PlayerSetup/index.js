import PlayerSetup from './PlayerSetup'
import { connect } from 'react-redux'
import history from '../../history'

const mapDispatchtoProps = dispatch => {

    return {

        //Allows the list of player names in local state to be added to global state

        handleSubmit: (players) => {
            
            dispatch({ type:"ADD_PLAYERS", playerList: players})

            //The history push will also move the user on to the tournament view

            history.push('/tournament')
            
        }
    }

}

export default connect(null, mapDispatchtoProps)(PlayerSetup)