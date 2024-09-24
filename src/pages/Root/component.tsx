import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import BaseTabPage from '../BaseTabPage';
import NotFoundPage from '../NotFoundPage';
import Layout from './Layout';

class RootComponent extends Component {

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<BaseTabPage />} />
                        <Route path="/tabs/*" element={<BaseTabPage />} />
                        <Route path="*" element={<NotFoundPage />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default RootComponent;