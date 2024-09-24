import {AlignType, OrientationType} from '../../asserts/types/style-types';

type DividerProps = {
    weight?: number,
    width?: string ,
    align?: AlignType,
    orientation?: OrientationType,
    bg?: string
    color?: string
    style?: any
}

const Divider: React.FC<DividerProps> = ({
    weight = 1,
    width = '100%',
    align = AlignType.LEFT,
    orientation = OrientationType.HORIZONTAL,
    bg = 'transparent',
    color = '#d1d1d1',
    style = null
}) => {

    return <div style={{
        display: 'flex',
        justifyContent: OrientationType.HORIZONTAL === orientation ? align : AlignType.LEFT,
        alignItems: OrientationType.VERICAL === orientation ? align : AlignType.LEFT,
        width: OrientationType.HORIZONTAL === orientation ? '100%' : weight,
        height: OrientationType.VERICAL === orientation ? '100%' : weight,
        background: bg,
    }}>
        <div style={{
            width: OrientationType.HORIZONTAL === orientation ? width : weight,
            height: OrientationType.VERICAL === orientation ? width : weight,
            background: color,
            ...style
        }}/>
    </div>
}

export default Divider;