import { Entity, EntityModel } from './types';

export default class TabsEntity implements Entity {

    name: string = 'tabs';

    model: any;

    constructor(model: EntityModel | null = null) {
        this.model = {
            [this.name]: model
        };
    }
}