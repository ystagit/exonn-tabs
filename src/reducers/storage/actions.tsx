import { STORAGE } from './constants';
import { EntityModel, EntityType } from '../../helpers/storage/entity/types';
import { StorageAction, StorageConfig } from './types';

const createStorageConfig = (type: EntityType, model: EntityModel | null = null): StorageConfig => {
    return { type, model } as StorageConfig;
}

const createStorageAction = (type: string, entityType: EntityType
                             , entityModel: EntityModel | null = null
                             , callback: Function | null = null): StorageAction => {
    const storageConfig = createStorageConfig(entityType, entityModel);
    return { type, storageConfig, callback }
}

export function saveEntity(entityType: EntityType, entityModel: EntityModel): StorageAction {
    return createStorageAction(STORAGE.SAVE.REQUEST, entityType, entityModel);
}

export function removeEntity(entityType: EntityType): StorageAction {
    return createStorageAction(STORAGE.REMOVE.REQUEST, entityType);
}

export function getEntity(entityType: EntityType, callback: Function | null = null): StorageAction {
    return createStorageAction(STORAGE.GET.REQUEST, entityType, null, callback);
}