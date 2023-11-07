import { ListItemButton, ListItemIcon, ListItemText, Divider, List, Paper } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FoundationIcon from "@mui/icons-material/Foundation";
import { useStore } from "app/stores/store";
import { Predicate } from "app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { Colors } from "app/layout/theme";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ActivityFilters = () => {
    const {
        activityStore: { predicate, setPredicate },
    } = useStore();
    const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

    useEffect(() => {
        console.log(value);
    }, [value]);

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
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                </LocalizationProvider>
            </Paper>
        </>
    );
};

export default observer(ActivityFilters);
