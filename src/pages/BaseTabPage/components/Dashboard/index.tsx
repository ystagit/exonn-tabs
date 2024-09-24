import React, { Component } from 'react';
import Row from '../../../../components/Row';

type DashboardProps = {
    args?: any,
};

class Dashboard extends Component<DashboardProps> {

    render() {

        return (
            <Row horizontalAlign={'center'}>
                It's Dashborad tab
            </Row>
        )
    }
}

export default Dashboard;