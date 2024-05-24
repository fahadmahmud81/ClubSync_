import React from 'react';
import Header from '../SharedPages/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../SharedPages/Footer/Footer';
import ScrollToTop from '../Components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    const location = useLocation();
    const pathsWithoutHeader = ['/login', '/register', "/student_panel", '/success_payment', '/fail_payment', '/certificatePdf/:id', '/admin_panel', "/advisor_panel"];
    const showHeader = !pathsWithoutHeader.includes(location.pathname) && !location.pathname.startsWith('/certificatePdf/');
    const pathsWithoutFooter = ['/login', '/register', "/student_panel", '/success_payment', '/fail_payment', '/certificatePdf/:id', '/admin_panel', "/advisor_panel"];
    // const showFooter = !pathsWithoutFooter.includes(location.pathname);
    const showFooter = !pathsWithoutFooter.includes(location.pathname) && !location.pathname.startsWith('/certificatePdf/');

    return (
        <div>
            <ScrollToTop></ScrollToTop>
            {showHeader && <Header></Header>}
            <Outlet></Outlet>
            {showFooter && <Footer></Footer>}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Main;