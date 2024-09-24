import {connect} from 'react-redux';

import ItemRowMoverComponent from './component';


const mapStateToProps = (state: any) => ({
    deviceType: state.options.deviceType
})

export default connect(
    mapStateToProps,
    null
)(ItemRowMoverComponent);