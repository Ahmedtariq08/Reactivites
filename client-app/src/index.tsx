import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app/layout/styles.css';
import { router } from './app/router/Routes';
import { StoreContext, store } from './app/stores/store';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { theme } from './app/layout/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
