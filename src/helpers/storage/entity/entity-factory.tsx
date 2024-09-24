import {Entity, EntityModel, EntityType} from './types';
import TabsEntity from './tabs-entity';

export default class EntityFactory {

    public build(type: EntityType, model: EntityModel | null = null): Entity | null {

        switch (type) {
            case EntityType.TABS:
                return new TabsEntity(model);
            default:
                console.error('EntityFactory :: Unable to find EntityType: ' + type);
        }

        return null;
    }

}