export const getPosition = (e: any) => {
    if (e?.touches && e.touches.length !== 0 || e.button === 0) {
        e = e.touches?.length ? e.touches[0] : e;
        return { x: e.pageX, y: e.pageY };
    }

    return null;
}