import HomePage from 'features/home/HomePage';
import { observer } from 'mobx-react-lite';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import { useStore } from 'app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from 'app/common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    <LoadingComponent content='Loading app ..' />
  }

  return (
    <>
      <ModalContainer />
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
