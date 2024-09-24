import React, {ReactNode} from 'react';

type RowProps = {
    children?: ReactNode,
    className?: string,
    style?: object
}

const Container: React.FC<RowProps> = ({
                                     children,
                                     className,
                                     style = {},
                                 }) => {

    return (
        <div
            className={className}
            style={{
                borderRadius: '10px',
                position: 'relative',
                width: '98%',
                minHeight: '100%',
                top: '1%',
                left: '1%',
                background: '#FFF',
                ...style
            }}
        >
            {children}
        </div>
    )
}

export default Container;