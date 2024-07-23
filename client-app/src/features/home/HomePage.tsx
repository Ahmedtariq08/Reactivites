import { NavigateTo, router } from "app/router/Routes";
import { useStore } from "app/stores/store";
import LoginForm from "features/users/LoginForm";
import RegisterForm from "features/users/RegisterForm";
import { observer } from "mobx-react-lite";
import { Button, Typography } from "@mui/material";

const HomePage = () => {
    const { userStore, modalStore } = useStore();

    const MarvelImage = () => {
        return (
            <img src="/assets/marvel/marvel-logo.png"
                alt='Marvel logo'
                style={{
                    width: 200,
                    height: 120,
                    objectFit: 'contain'
                }}></img>
        )
    }

    const LoginButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                    width: 200,
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: '4rem'
                }}
                onClick={() => modalStore.openModal(<LoginForm />)}>Login</Button>
        )
    }

    const RegisterButton = () => {
        return (
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    width: 200,
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: '2rem'
                }}
                onClick={() => modalStore.openModal(<RegisterForm />)}>Register</Button>
        )
    }

    const GoToActivitiesButton = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                sx={{
                    width: 200,
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: '2rem'
                }}
                onClick={() => router.navigate(NavigateTo.Activities)}>Go to Activities</Button>
        )
    }

    return (
        <div className="marvel-background">
            <div className="content-container">
                <MarvelImage />
                {userStore.isLoggedIn ?
                    <>
                        <Typography variant="h4" color='wheat' fontFamily='Fiver'> Welcome to </Typography>
                        <Typography variant="h1" color='wheat' fontFamily='Fiver'> REACTIVITIES </Typography>
                        <GoToActivitiesButton />
                    </> :
                    <>
                        <Typography variant="h1" color='wheat' fontFamily='Fiver'> REACTIVITIES </Typography>
                        <LoginButton />
                        <RegisterButton />
                    </>}
            </div>
        </div>
    )
}

export default observer(HomePage);