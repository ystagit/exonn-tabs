export interface TabType {
    id: string,
    link: string,
    icon: string,
    iconLib: string,
    name: string,
    pinned: boolean,
}

export enum ActiveTabStyle {
    STANDARD,
    DROPDOWN
}