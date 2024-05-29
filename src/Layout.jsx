import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./context/AuthProvider";

const Layout = () => {
  const user = useAuth();
  const location = useLocation()
  useEffect(() => {
    if(location.pathname !== '/login') {
      localStorage.setItem('lastPath', location.pathname)
    }
  }, [location.pathname])
  if (!user.isAuth) return <Navigate to="/login" />;
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default Layout;