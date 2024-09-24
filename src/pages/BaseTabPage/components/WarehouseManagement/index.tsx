import React, { Component } from 'react';
import Row from '../../../../components/Row';

type WarehouseManagementProps = {
    args?: any,
};

class WarehouseManagement extends Component<WarehouseManagementProps> {

    render() {

        return (
            <Row horizontalAlign={'center'}>
                It's Lagerverwaltung tab
            </Row>
        )
    }
}

export default WarehouseManagement;