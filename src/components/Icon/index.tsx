import React, { Component } from 'react';
import * as md from 'react-icons/md';
import * as gi from 'react-icons/gi';
import * as fa from 'react-icons/fa';
import * as tb from 'react-icons/tb';
import * as ri from 'react-icons/ri';

const libs = new Map<string, any>([
    ['md', md],
    ['gi', gi],
    ['fa', fa],
    ['tb', tb],
    ['ri', ri],
]);

type IconProps = {
    lib?: string,
    name: string,
    color?: string,
    w?: string,
    h?: string,
    style?: any,
    className?: string,
    disabled?: boolean,
    args?: object,
    onClick?: any,
    onHover?: any,
    onBlur?: any,
}

class Icon extends Component<IconProps> {

    public static defaultProps = {
        w: '30px',
        h: '30px',
        color: null,
    }

    private handleHover = (e : MouseEvent) : void => {

        if (e.type === 'mouseenter') {
            this.props.onHover?.();
        } else if (e.type === 'mouseleave') {
            this.props.onBlur?.();
        }
    }

    private handleClick = (e: MouseEvent) : void => {

        if (!this.props.disabled) {
            this.props.onClick?.(e, this.props.args);
        }
    }

    get className() {
        return this.props.className ?? '';
    }

    get styles() {
        return {
            color: this.props.color,
            width: this.props.w,
            height: this.props.h,
            ...this.props.style,
        };
    }

    render() {
        const libName : string = this.props.lib || 'md';
        const iconLib : any = libs.get(libName);
        let FoundIcon : any = iconLib[this.props.name || 'MdQuestionMark'];
        FoundIcon = (FoundIcon) ? FoundIcon : libs.get('md')['MdQuestionMark'];

        return (
            <FoundIcon className={this.className}
                       style={this.styles}
                       onMouseEnter={this.handleHover}
                       onMouseLeave={this.handleHover}
                       onClick={this.handleClick}/>
        )
    }

}

export default Icon;