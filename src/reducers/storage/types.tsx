import { EntityModel, EntityType } from "../../helpers/storage/entity/types";

export interface StorageConfig {
    type: EntityType,
    model: EntityModel
}

export interface StorageAction {
    type: string,
    storageConfig: StorageConfig,
    callback: Function | null
}