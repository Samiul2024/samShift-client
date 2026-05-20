import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import DeveloperFooter from '../components/DeveloperFooter';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
            <DeveloperFooter />
        </div>
    );
};

export default RootLayout;