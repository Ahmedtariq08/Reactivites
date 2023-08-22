import { NavigateTo, router } from 'app/router/Routes';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const TabBarData = [
    { key: 1, title: 'Activities', startIcon: <LocalActivityIcon sx={{ color: 'goldenrod' }} />, redirect: () => router.navigate(NavigateTo.Activities) },
    { key: 2, title: 'Errors', startIcon: <ErrorOutlineIcon sx={{ color: 'firebrick' }} />, redirect: () => router.navigate(NavigateTo.Errors) },
    { key: 3, title: 'Create Activity', startIcon: <AddCircleOutlineIcon sx={{ color: 'olivedrab' }} />, redirect: () => router.navigate(NavigateTo.CreateActivity) },
]


const NavBar = () => {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const HomeButton = () => {
        return (
            <Button
                onClick={() => router.navigate(NavigateTo.Root)}
                sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '2rem' }}
                variant='contained'
                startIcon={<Avatar variant='circular' src='captain.ico' />}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Fiver',
                        fontSize: 25,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    Reactivities
                </Typography>
            </Button>
        )
    }

    const TabBar = () => {
        return (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {TabBarData.map(data => (
                    <Button
                        key={data.key}
                        size='large'
                        variant='outlined'
                        startIcon={data.startIcon}
                        sx={{
                            fontSize: 'larger',
                            fontWeight: 600,
                            color: 'wheat',
                            textDecoration: 'none',
                            borderRadius: '0',
                            borderBottom: '3px solid wheat'
                        }}
                        onClick={data.redirect}
                    >
                        {data.title}
                    </Button>
                ))}
            </Box>
        )
    }
    //sx={{ position: 'fixed', bottom: 0 }}
    return (
        <div >
            <AppBar position="static" sx={{ minWidth: '100%' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <HomeButton />
                        {isLoggedIn &&
                            <>
                                <TabBar />
                                <Box sx={{ flexGrow: 0 }}>
                                    <Button
                                        sx={{ color: 'wheat' }}
                                        onClick={handleOpenUserMenu}
                                        startIcon={<Avatar variant='circular' src={user?.image || '/assets/user.png'} />}
                                        endIcon={<KeyboardArrowDownIcon fontSize='large' />}
                                    >
                                    </Button>
                                    <Menu
                                        sx={{ mt: '50px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={() => router.navigate(NavigateTo.Profile(user?.username!))}>
                                            <ListItemIcon>
                                                <LogoutIcon />
                                            </ListItemIcon>
                                            <Typography textAlign="center">My Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={logout}>
                                            <ListItemIcon>
                                                <AccountBoxIcon />
                                            </ListItemIcon>
                                            <Typography textAlign="center">Sign Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
};

export default observer(NavBar);