import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import {Outlet, useLocation} from "react-router-dom";

const Layout = () => {
  const location = useLocation()
  useEffect(() => {
    if(location.pathname !== '/login') {
      localStorage.setItem('lastPath', location.pathname)
    }
  }, [location.pathname])
  return (
    <div className='wrapper'>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default Layout;