import { NavigateTo } from 'app/router/Routes';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const NavBar = () => {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to={NavigateTo.Root} header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                {isLoggedIn && <>
                    <Menu.Item as={NavLink} to={NavigateTo.Activities} name='Activities' />
                    <Menu.Item as={NavLink} to={NavigateTo.Errors} name='Errors' />
                    <Menu.Item>
                        <Button as={NavLink} to={NavigateTo.CreateActivity} positive content='Create Activity' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={NavigateTo.Profile(user?.username!)} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </>}
            </Container>
        </Menu>

    )
};

export default observer(NavBar);