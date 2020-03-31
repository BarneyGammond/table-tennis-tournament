import Tournament from './Tournament'
import { connect } from 'react-redux'
import history from '../../history'

const mapStateToProps = ({rounds}) => ({rounds})

const mapDispatchToProps = dispatch => {

    return {
        
        handleResult: (playerID,matchIndex,roundIndex,final) => {

            if (final) history.push('./results')

            dispatch({ type:"RESULT_ENTRY", playerID, matchIndex,roundIndex,final})

            

        }

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Tournament);

