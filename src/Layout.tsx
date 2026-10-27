import { Outlet } from 'react-router';
import Navbar from './components/layouts/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
