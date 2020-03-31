import {connect} from 'react-redux'
import ResultsPage from './ResultsPage'

const mapStateToProps = ({players}) => ({players}) 

export default connect(mapStateToProps)(ResultsPage)