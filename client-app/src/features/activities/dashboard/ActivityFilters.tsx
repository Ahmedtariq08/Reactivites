import { ListItemButton, ListItemIcon, ListItemText, Divider, List, Paper } from "@mui/material";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FoundationIcon from '@mui/icons-material/Foundation';
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Colors } from "app/layout/theme";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const ActivityFilters = () => {
    const { activityStore: { predicate, setPredicate } } = useStore();

    return (
        <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: '5rem' }} elevation={20}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton sx={{ padding: '0 1rem' }}>
                    <ListItemIcon>
                        <FilterAltIcon fontSize="large" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Filter" primaryTypographyProps={{ fontSize: 20, fontWeight: 600, color: Colors.DarkPurple }} />
                </ListItemButton>

                <Divider />

                <ListItemButton
                    selected={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                >
                    <ListItemIcon>
                        <AllInclusiveIcon fontSize="large" />
                    </ListItemIcon >
                    <ListItemText primary="All Activities" />
                </ListItemButton>

                <ListItemButton
                    selected={predicate.has('IsGoing')}
                    onClick={() => setPredicate('IsGoing', 'true')}
                >
                    <ListItemIcon>
                        <CallMissedOutgoingIcon fontSize="large" sx={{ color: Colors.Going }} />
                    </ListItemIcon>
                    <ListItemText primary="I'm Going" />
                </ListItemButton>

                <ListItemButton
                    selected={predicate.has('IsHost')}
                    onClick={() => setPredicate('IsHost', 'true')}
                >
                    <ListItemIcon>
                        <FoundationIcon fontSize="large" sx={{ color: Colors.IsHost }} />
                    </ListItemIcon>
                    <ListItemText primary="I'm Hosting" />
                </ListItemButton>
            </List>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={predicate.get('startDate') || new Date()}
                    onChange={(date: any) => setPredicate('startDate', date as Date)}
                />
            </LocalizationProvider> */}
        </Paper>
    )
}

export default observer(ActivityFilters);