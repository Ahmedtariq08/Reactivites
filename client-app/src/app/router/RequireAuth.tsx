import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { userStore: { isLoggedIn } } = useStore();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return <Outlet />
}

export default observer(RequireAuth);