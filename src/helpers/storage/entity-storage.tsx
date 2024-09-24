import {EntityModel, EntityType} from './entity/types';
import EntityFactory from './entity/entity-factory';
import StorageErrors from './storage-errors';

export default class EntityStorage {

    static entityFactory: EntityFactory = new EntityFactory();

    static save = (type: EntityType, model: EntityModel): Promise<any> =>
        new Promise((resolve, reject) => {
            const entity = EntityStorage.entityFactory.build(type, model);

            if (entity) {

                if (typeof entity.model === 'object') {
                    localStorage.setItem(entity.name, JSON.stringify(entity.model));
                    resolve(entity);
                } else {
                    reject(StorageErrors.INVALID_MODEL_TYPE);
                }
            } else {
                reject(StorageErrors.NO_TYPE);
            }
        });

    static remove = (type: EntityType): Promise<any> =>
        new Promise((resolve, reject) => {
            const entity = EntityStorage.entityFactory.build(type);

            if (entity) {
                const entityModel = localStorage.getItem(entity.name);

                if (entityModel) {
                    entity.model = JSON.parse(entityModel);
                    localStorage.removeItem(entity.name);
                    resolve(entity);
                }
            } else {
                reject(StorageErrors.NO_TYPE);
            }
        });

    static get = (type: EntityType): Promise<any> =>
        new Promise((resolve, reject) => {
            const entity = EntityStorage.entityFactory.build(type);

            if (entity) {
                const entityModel = localStorage.getItem(entity.name);

                if (entityModel) {
                    entity.model = JSON.parse(entityModel);
                    resolve(entity);
                } else {
                    resolve(null);
                }
            } else {
                reject(StorageErrors.NO_TYPE);
            }
        });
}