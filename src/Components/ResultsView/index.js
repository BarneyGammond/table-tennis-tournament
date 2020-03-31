import {connect} from 'react-redux'
import ResultsPage from './ResultsPage'

const mapStateToProps = ({winner,runnerUp}) => ({winner,runnerUp}) 

export default connect(mapStateToProps)(ResultsPage)