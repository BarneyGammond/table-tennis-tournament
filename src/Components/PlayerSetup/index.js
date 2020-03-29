import PlayerSetup from './PlayerSetup'
import { connect } from 'react-redux'

const mapDispatchtoProps = dispatch => {

    return {

        handleSubmit: (players) => dispatch({ type:"ADD_PLAYERS", playerList: players})

    }

}

export default connect(null, mapDispatchtoProps)(PlayerSetup)