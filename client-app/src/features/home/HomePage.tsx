import FacebookLogin from "@greatsumini/react-facebook-login";
import { NavigateTo } from "app/router/Routes";
import { useStore } from "app/stores/store";
import LoginForm from "features/users/LoginForm";
import RegisterForm from "features/users/RegisterForm";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom"
import { Button, Container, Divider, Header, Image, Segment } from "semantic-ui-react"

const HomePage = () => {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as={'h1'} inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to={NavigateTo.Activities} size="huge" inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Register!
                        </Button>
                        <Divider horizontal inverted>Or</Divider>
                        <Button
                            as={FacebookLogin}
                            appId={673369484660128}
                            size="huge"
                            inverted
                            color="facebook"
                            content="Login with Facebook"
                            onSuccess={(response: any) => {
                                console.log("Login sucess", response);
                            }}
                            onFail={(response: any) => {
                                console.log("Login failed", response);
                            }}
                        />
                    </>
                )}
            </Container>
        </Segment>
    )
}

export default observer(HomePage);