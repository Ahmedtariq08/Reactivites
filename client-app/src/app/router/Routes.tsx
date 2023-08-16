import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "features/activities/details/ActivityDetails";
import ActivityForm from "features/activities/form/ActivityForm";
import App from "app/layout/App";
import TestErrors from "features/errors/TestError";
import NotFound from "features/errors/NotFound";
import ServerError from "features/errors/ServerError";
import LoginForm from "features/users/LoginForm";
import ProfilePage from "features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";

const Paths = {
    Root: '/',
    Activities: 'activities',
    Activity: 'activities/:id',
    CreateActivity: 'createActivity',
    ManageActivity: 'manage/:id',
    Profile: 'profile/:username',
    Login: 'login',
    Errors: 'errors',
    NotFound: 'not-found',
    ServerError: 'server-error'
}

//used in Link to={} or useNavigate
export const NavigateTo = {
    Root: Paths.Root,
    Activities: `/${Paths.Activities}`,
    Activity: (id: string) => `/${Paths.Activity.replace(':id', id)}`,
    CreateActivity: `/${Paths.CreateActivity}`,
    ManageActivity: (id: string) => `/${Paths.ManageActivity.replace(':id', id)}`,
    Profile: (username: string) => `/${Paths.Profile.replace(':username', username)}`,
    Login: `/${Paths.Login}`,
    Errors: `/${Paths.Errors}`,
    NotFound: `/${Paths.NotFound}`,
    ServerError: `/${Paths.ServerError}`
}


export const routes: RouteObject[] = [
    {
        path: Paths.Root,
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: Paths.Activities, element: <ActivityDashboard /> },
                    { path: Paths.Activity, element: <ActivityDetails /> },
                    { path: Paths.CreateActivity, element: <ActivityForm key={'create'} /> },
                    { path: Paths.ManageActivity, element: <ActivityForm key={'manage'} /> },
                    { path: Paths.Profile, element: <ProfilePage /> },
                    { path: Paths.Login, element: <LoginForm /> },
                    { path: Paths.Errors, element: <TestErrors /> },
                ]
            },
            { path: Paths.NotFound, element: <NotFound /> },
            { path: Paths.ServerError, element: <ServerError /> },
            { path: '*', element: <Navigate replace to={NavigateTo.NotFound} /> },
        ]
    }
]

export const router = createBrowserRouter(routes);