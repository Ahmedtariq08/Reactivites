import HomePage from 'features/home/HomePage';
import { observer } from 'mobx-react-lite';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';

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
