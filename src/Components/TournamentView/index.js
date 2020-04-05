import Tournament from './Tournament'
import { connect } from 'react-redux'

//The tournment view receives both the round and players

const mapStateToProps = ({rounds,players}) => ({rounds,players})

const mapDispatchToProps = dispatch => {

    return {
        
        handleResult: (matchIndex,roundIndex,p1Score,p2Score) => {

            dispatch({ type:"RESULT_ENTRY", matchIndex,roundIndex,p1Score, p2Score})

        }

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Tournament);

