import React, { Component } from 'react';

type SpaceProps = {
    wSize?: string,
    hSize?: string,
    size?: string
}

class Space extends Component<SpaceProps> {

    render() {
        return (<div style={{
            width: this.props.wSize || this.props.size,
            height: this.props.hSize || this.props.size
        }} />);
    }
}

export default Space;