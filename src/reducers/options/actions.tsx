import { OPTIONS } from './constants';
import { DeviceType } from './options-type';

export const changeDeviceType = (deviceType: DeviceType) => {
    return { type: OPTIONS.CHANGE_DIVECE_TYPE, deviceType }
}