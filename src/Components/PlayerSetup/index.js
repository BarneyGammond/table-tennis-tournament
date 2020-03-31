import PlayerSetup from './PlayerSetup'
import { connect } from 'react-redux'
import history from '../../history'

const mapDispatchtoProps = dispatch => {

    return {

        handleSubmit: (players) => {
            
            dispatch({ type:"ADD_PLAYERS", playerList: players})

            history.push('/tournament')
            
        }
    }

}

export default connect(null, mapDispatchtoProps)(PlayerSetup)