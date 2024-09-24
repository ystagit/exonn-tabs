import React, {Component} from 'react';
import Row from '../../../Row';
import Icon from '../../../Icon';

import './index.css';

type IconTabProps = {
    pinned?: boolean,
    onClick: Function
}

class PinButton extends Component<IconTabProps> {

    public static defaultProps = {
        pinned: false,
    }

    handleClick = () => {
        this.props.onClick?.(!this.props.pinned);
    }

    get icon() {
        return !this.props.pinned ? 'RiPushpinLine' : 'RiPushpin2Line';
    }

    get title() {
        return !this.props.pinned ? 'Tab anpinnen' : 'Tab unpinnen';
    }

    render() {
        return (
            <Row verticalAlign={'center'}
                 className={'pin-button-container'}
                 onClick={this.handleClick}
            >
                <Icon w={'25px'} h={'25px'}
                      lib={'ri'}
                      name={this.icon} />
                <div className={'pin-name'}>
                    {this.title}
                </div>
            </Row>
        )
    }

}

export default PinButton;