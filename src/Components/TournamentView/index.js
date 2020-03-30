import Tournament from './Tournament'
import { connect } from 'react-redux'

const mapStateToProps = ({rounds}) => ({rounds})

const mapDispatchToProps = dispatch => {

    return {
        
        handleResult: (playerID,matchIndex,roundIndex) => {

            dispatch({ type:"RESULT_ENTRY", playerID, matchIndex,roundIndex})

        }

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Tournament);

