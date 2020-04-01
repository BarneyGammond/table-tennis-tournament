import Tournament from './Tournament'
import { connect } from 'react-redux'

const mapStateToProps = ({rounds,players}) => ({rounds,players})

const mapDispatchToProps = dispatch => {

    return {
        
        handleResult: (loserID,winnerID,matchIndex,roundIndex) => {

            dispatch({ type:"RESULT_ENTRY", loserID, winnerID, matchIndex,roundIndex})

        }

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Tournament);

