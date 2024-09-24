import React, {ReactNode} from 'react';

export interface DropdownItem {
    id: string,
    component: ReactNode
}

export enum DropdownControlType {
    RIGTH,
    LEFT
}