export interface Entity {

    name: string,

    model: EntityModel | null

}

export interface EntityModel {}

export enum EntityType {
    TABS,
}