import ModalContainer from 'app/common/modals/ModalContainer';
import { useStore } from 'app/stores/store';
import HomePage from 'features/home/HomePage';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import LoadingComponent from './LoadingComponent';
import NavBar from './Navbar';

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
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> :
        <div>
          <NavBar />
          <div className='app-main-container'>
            <div className='app-content-container'>
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      }
    </>
  );
}

export default observer(App);
