import Tournament from './Tournament'
import { connect } from 'react-redux'

const mapStateToProps = ({rounds}) => ({rounds})

export default connect(mapStateToProps)(Tournament);