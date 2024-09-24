import {STORAGE} from '../../reducers/storage/constants';
import EntityStorage from './entity-storage';
import {Entity} from './entity/types';

/**
 * Store entity if action contains storageConfig
 * */
const storageMiddleware = (store : any) => (next : Function) => (action : any) => {

    if (!action || !action.storageConfig) {
        return next(action);
    }

    const { storageConfig } = action;

    const onSuccess = (type: any, entity: Entity) => {
        action.callback?.(entity);
        store.dispatch({ type, entity });
    }
    const onFailure = (type: any, errorType: any) => {
        action.callback?.(null);
        store.dispatch({ type, errorType });
    }

    switch (action.type) {
        case STORAGE.SAVE.REQUEST:
            EntityStorage.save(storageConfig.type, storageConfig.model)
                .then((entity) => onSuccess(STORAGE.SAVE.SUCCESS, entity))
                .catch((errorType) => onFailure(STORAGE.SAVE.FAILURE, errorType));
            break;
        case STORAGE.REMOVE.REQUEST:
            EntityStorage.remove(storageConfig.type)
                .then((entity) => onSuccess(STORAGE.REMOVE.SUCCESS, entity))
                .catch((errorType) => onFailure(STORAGE.REMOVE.FAILURE, errorType));
            break;
        case STORAGE.GET.REQUEST:
            EntityStorage.get(storageConfig.type)
                .then((entity) => onSuccess(STORAGE.GET.SUCCESS, entity))
                .catch((errorType) => onFailure(STORAGE.GET.FAILURE, errorType));
    }

    return next(action);
}

export default storageMiddleware;
