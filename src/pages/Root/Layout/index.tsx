import {connect} from 'react-redux';
import {Action} from 'redux-saga';
import {Dispatch} from 'react';
import {changeDeviceType} from '../../../reducers/options/actions';
import {DeviceType} from '../../../reducers/options/options-type';

import LayoutComponent from './component';

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onChangeDeviceType: (deviceType: DeviceType) => {
        dispatch(changeDeviceType(deviceType));
    }
})

export default connect(
    null,
    mapDispatchToProps
)(LayoutComponent);