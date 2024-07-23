import SearchIcon from '@mui/icons-material/Search';
import { Button, Container, Grid, Typography } from "@mui/material";
import { NavigateTo, router } from "app/router/Routes";

const NotFound = () => {

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                minHeight: '85vh'
            }}
        >
            <Grid container direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={2}>
                    <SearchIcon sx={{ fontSize: 200 }} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h1" sx={{ color: 'whitesmoke', textAlign: 'center', fontWeight: 800 }}>
                        Page not Found!
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h4" sx={{ color: 'whitesmoke', textAlign: 'center', fontWeight: 600 }}>
                Oops! We have looked everywhere but could not find what you are looking for!
            </Typography>

            <Button
                variant="contained"
                size="large"
                sx={{ width: '40%', fontSize: 20 }}
                onClick={() => router.navigate(NavigateTo.Activities)}
            >
                Return to Activities Page
            </Button>
        </Container>
    )
}

export default NotFound;