import NoTab from './components/NoTab';
import WarehouseManagement from './components/WarehouseManagement';
import Dashboard from './components/Dashboard';
import Banking from './components/Banking';

export enum TabComponnetType {
    NO_TAB = 'NO_TAB',
    WAREHOUSE_MANAGEMENT = 'WAREHOUSE_MANAGEMENT',
    DASHBOARD = 'DASHBOARD',
    BANKING = 'BANKING',
}

export const TabComponents = {
    [TabComponnetType.NO_TAB]: () => <NoTab />,
    [TabComponnetType.WAREHOUSE_MANAGEMENT]: (args?: any) => <WarehouseManagement args={args} />,
    [TabComponnetType.DASHBOARD]: (args?: any) => <Dashboard args={args} />,
    [TabComponnetType.BANKING]: (args?: any) => <Banking args={args} />,
}