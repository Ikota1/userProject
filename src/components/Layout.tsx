import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import classes from './Layout.module.css';
import Footer from '../components/Footer/Footer';

const Layout = () => {
  const location = useLocation();
  const isUsersPage = location.pathname === '/users';

  return (
    <div className={classes.container}>
      <Header isUsersPage={isUsersPage} />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
