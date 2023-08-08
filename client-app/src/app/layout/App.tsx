import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import HomePage from '../../features/home/HomePage';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> :
        <SkeletonTheme baseColor="#f6f7f8" highlightColor="#e5e6e9">
          <NavBar />
          <Container style={{ marginTop: '7rem' }}>
            <Outlet />
          </Container>
        </SkeletonTheme>
      }
    </>
  );
}

export default observer(App);
