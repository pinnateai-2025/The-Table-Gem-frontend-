import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer1 from '../components/Footer1';
import Footer2 from '../components/Footer2';
import SubscribeSection from '../components/SubscribeSection';

const Layout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Navbar />
      {/* <main>{children}</main> */}
      {/* <SubscribeSection/> */}
      {/* <Footer1 /> */}
      {/* <Footer2 /> */}
    </>
  )
}

export default Layout;