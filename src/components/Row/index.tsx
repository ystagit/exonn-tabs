import React, {ReactNode, forwardRef} from 'react';

type RowProps = {
    ref?: any,
    children?: ReactNode,
    id?: string,
    w?: string,
    h?: string,
    horizontalAlign?: string,
    verticalAlign?: string,
    className?: string,
    style?: object,
    onClick?: any,
    onMouseEnter?: any,
    onMouseLeave?: any,
}

const Row: React.FC<RowProps> = forwardRef(({
                                     children,
                                     id,
                                     w,
                                     h,
                                     horizontalAlign,
                                     verticalAlign,
                                     className,
                                     style = {},
                                     onClick,
                                     onMouseEnter,
                                     onMouseLeave,
                                 }, ref: any) => {

    return (
        <div
            ref={ref}
            id={id}
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                display: 'flex',
                alignItems: verticalAlign ?? 'start',
                flexDirection: 'row',
                justifyContent: horizontalAlign,
                width: w,
                height: h,
                ...style
            }}
        >
            {children}
        </div>
    )
})

export default Row;