import { connect } from 'react-redux';

import BaseTabPage from './component';

const mapStateToProps = (state: any) => ({
    activeTabId: state.storage?.tabs?.activeTabId ?? null,
    unpinnedTabs: state.storage?.tabs?.unpinnedTabs ?? [],
    pinnedTabs: state.storage?.tabs?.pinnedTabs ?? [],
})

export default connect(
    mapStateToProps
)(BaseTabPage);