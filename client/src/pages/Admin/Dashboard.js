// pages/DashboardPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardGraphs from '../../components/DashboardGraphs';
import Topbar from '../../components/Topbar';
import View from '../../components/ViewProducts';
import Add from '../../components/AddProduct';
import Sub from '../../components/ViewSubscribers';

const DashboardPage = () => {
    return (
        <div style={styles.dashboard}>
            <Sidebar />
            <div style={styles.main}>
                <Topbar userName="Muhammad Taha" />
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<DashboardGraphs />} />
                        <Route path="/products" element={<View />} />
                        <Route path="/add-product" element={<Add />} />
                        <Route path="/subscribers" element={<Sub />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        padding: '20px',
        flex: 1,
    },
};

export default DashboardPage;
