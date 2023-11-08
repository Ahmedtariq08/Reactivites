import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FoundationIcon from "@mui/icons-material/Foundation";
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Colors } from "app/layout/theme";
import { Predicate } from "app/stores/activityStore";
import { useStore } from "app/stores/store";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
    const {
        activityStore: { predicate, setPredicate },
    } = useStore();

    const dateChanged = (date: Dayjs | null) => {
        if (date != null) {
            setPredicate(Predicate.StartDate, date.toDate());
        }
    };

    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    marginTop: "5rem",
                }}
                elevation={20}
            >
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton sx={{ padding: "0 1rem" }}>
                        <ListItemIcon>
                            <FilterAltIcon fontSize="large" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Filter"
                            primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: Colors.DarkPurple,
                            }}
                        />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton
                        selected={predicate.has(Predicate.All)}
                        onClick={() => setPredicate(Predicate.All, "true")}
                    >
                        <ListItemIcon>
                            <AllInclusiveIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="All Activities" />
                    </ListItemButton>

                    <ListItemButton
                        selected={predicate.has(Predicate.IsGoing)}
                        onClick={() => setPredicate(Predicate.IsGoing, "true")}
                    >
                        <ListItemIcon>
                            <CallMissedOutgoingIcon fontSize="large" sx={{ color: Colors.Going }} />
                        </ListItemIcon>
                        <ListItemText primary="I'm Going" />
                    </ListItemButton>

                    <ListItemButton
                        selected={predicate.has(Predicate.IsHost)}
                        onClick={() => setPredicate(Predicate.IsHost, "true")}
                    >
                        <ListItemIcon>
                            <FoundationIcon fontSize="large" sx={{ color: Colors.IsHost }} />
                        </ListItemIcon>
                        <ListItemText primary="I'm Hosting" />
                    </ListItemButton>
                </List>
            </Paper>
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    marginTop: "5rem",
                }}
                elevation={20}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={
                            predicate.get(Predicate.StartDate)
                                ? dayjs(predicate.get(Predicate.StartDate))
                                : dayjs(new Date())
                        }
                        onChange={(date) => dateChanged(date)}
                    />
                </LocalizationProvider>
                <div style={{ textAlign: "center", justifyContent: "center", padding: "0.5rem 0rem" }}>
                    <Typography variant="caption">Filter activities according to start date</Typography>
                </div>
            </Paper>
        </>
    );
};

export default observer(ActivityFilters);
