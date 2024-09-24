export enum AxisType {
    NULL,
    X,
    Y,
}

/**
 * Returns true if cursor is on an element, otherwise false
 * @param element - the element we are looking at
 * @param position - it's cursor position
 * @return boolean value
 * */
const isHit = (element: any, position: { x: number, y: number }) => {
    const rect = element?.getBoundingClientRect();

    if (rect) {
        return position.x > rect.x && position.x < rect.x + rect.width
            && position.y > rect.y && position.y < rect.y + rect.height;
    }

    return false;
}

const isHitByX = (element: any, position: { x: number, y: number }) => {
    const rect = element?.getBoundingClientRect();

    if (rect) {
        return position.x >= rect.x && position.x <= (rect.x + rect.width);
    }

    return false;
}

const isHitByY = (element: any, position: { x: number, y: number }) => {
    const rect = element?.getBoundingClientRect();

    if (rect) {
        return position.y > rect.y && position.y < rect.y + rect.height;
    }

    return false;
}

/**
 * Checks each child element and then
 * returns element if cursor is on an element, otherwise null
 * @param element - the element we are looking at
 * @param position - it's cursor position
 * @return element or null
 * */
export const findElementByPosition = (elementRef: any, position: { x: number, y: number }, axis: AxisType = AxisType.NULL) => {

    if (elementRef) {

        for (let i = 0; i < elementRef.children.length; i++) {
            const element = elementRef.children[i];
            const check = axis === AxisType.X ? isHitByX
                    : axis === AxisType.Y ? isHitByY
                    : isHit;

            if (check(element, position)) {
                return element;
            }
        }
    }

    return null;
}

/**
 * Finds index of the element by id
 * */
export const findIndexOfElement = (parentElement: any, activeElement: any) => {

    if (!parentElement) { return -1; }

    for (let i = 0; i < parentElement.children.length; i++) {

        if (parentElement.children[i]?.getAttribute('id') === activeElement?.getAttribute('id')) {
            return i;
        }
    }


    return -1;
}

const currentPos = { x: 0, y: 0 };

const xDir = (x: number) => {
    const result = currentPos.x - x;
    currentPos.x = x;
    return result;
}

let index = -1;

/**
 * Changes element position and then return the element's id and next index
 * */
export const setElementByPosition = (elementRef: any, position: { x: number, y: number }, activeElement: any) => {
    const foundElement = findElementByPosition(elementRef, position, AxisType.X);
    const parent = activeElement?.parentElement;
    let focusedElement = null;

    if (foundElement && foundElement?.getAttribute('id') !== parent?.getAttribute('id')) {
        const xDirection = xDir(position.x);

        if (xDirection > 0) {
            elementRef?.removeChild(parent);
            focusedElement = elementRef?.insertBefore(parent, foundElement);
        } else if (xDirection < 0) {
            elementRef?.removeChild(foundElement);
            elementRef?.insertBefore(foundElement, parent);
            focusedElement = parent;
        }
    }

    const i = findIndexOfElement(elementRef, focusedElement);

    if (i !== -1 && index !== i) {
        index = i;
        return {
            focusedElementId: focusedElement?.id,
            nextIndex: i,
        }
    }

    return {
        focusedElementId: null,
        nextIndex: -1
    }
}