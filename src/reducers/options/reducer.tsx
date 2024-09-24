import {OPTIONS} from './constants';
import {DeviceType} from './options-type';

const defaultOptions = {
    deviceType: DeviceType.DESKTOP
}

const options = (state: any = defaultOptions, action: any) => {
    
    switch (action.type) {
        case OPTIONS.CHANGE_DIVECE_TYPE:
            console.log('CAHANGE DEVICE TYPE: ' + action.deviceType)
            return {
                ...state,
                deviceType: action.deviceType
            };
    }

    return state;
}

export default options;