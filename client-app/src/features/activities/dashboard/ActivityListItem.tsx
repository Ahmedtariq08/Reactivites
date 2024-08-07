import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { Colors } from "app/layout/theme";
import { Activity } from "app/models/activity";
import { NavigateTo, router } from "app/router/Routes";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
    activity: Activity;
}

const ActivityListItem = (props: Props) => {
    const { activity } = props;

    const HostImage = () => {
        return (
            <Avatar
                alt={activity.host?.displayName}
                src={activity.host?.image || "/assets/user.png"}
                sx={{ width: 80, height: 80, border: "2px solid black" }}
            />
        );
    };

    const ActivityStatusForUser = () => {
        let backgroundColor = activity.isCancelled
            ? Colors.Cancelled
            : activity.isHost
            ? Colors.IsHost
            : Colors.Going;
        let title = activity.isCancelled ? "Cancelled" : activity.isHost ? "Hosting" : "Going";
        return (
            <Typography
                variant="body2"
                sx={{
                    width: "fit-content",
                    textAlign: "center",
                    color: `whitesmoke`,
                    border: `1px solid black`,
                    backgroundColor: backgroundColor,
                    borderRadius: 1,
                    padding: "2px 4px",
                }}
            >
                <strong>{title}</strong>
            </Typography>
        );
    };

    const ActivityMainContent = () => {
        return (
            <Box display={"flex"} flexDirection={"column"} margin={"0 2rem"} justifyContent={"space-between"}>
                <Typography variant="h5" sx={{ fontWeight: 600 }} color={"primary"}>
                    {activity.title}
                </Typography>
                <Typography>
                    Hosted By{" "}
                    <Link to={NavigateTo.Profile(activity.hostUsername)}>{activity.host?.displayName}</Link>
                </Typography>
                <ActivityStatusForUser />
            </Box>
        );
    };

    const TimeAndLocation = () => {
        return (
            <>
                <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                    <AccessTimeIcon color="primary" />
                    <Typography color={"ButtonText"} gutterBottom marginLeft={"0.5rem"}>
                        {format(activity.date!, "dd MMMM yyyy -  h:mm aa")}
                    </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                    <LocationOnIcon />
                    <Typography marginLeft={"0.5rem"}>{activity.venue}</Typography>
                </Box>
            </>
        );
    };

    const ListOfAttendees = () => {
        return (
            <Stack direction="row">
                {activity.attendees &&
                    activity.attendees.map((attendee) => (
                        <Button
                            key={attendee.username}
                            onClick={() => router.navigate(NavigateTo.Profile(attendee.username))}
                            title={`Click to view ${attendee.displayName}'s profile`}
                            startIcon={
                                <Avatar variant="circular" src={attendee.image || "/assets/user.png"} />
                            }
                        ></Button>
                    ))}
            </Stack>
        );
    };
    return (
        <Card sx={{ backgroundColor: Colors.LightPurple, padding: "0rem 1rem", margin: "1rem 0" }}>
            <CardContent>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    margin={"1rem 0rem"}
                    justifyContent={"space-between"}
                >
                    <Box display={"flex"} flexDirection={"row"}>
                        <HostImage />
                        <ActivityMainContent />
                    </Box>
                </Box>
                <Divider />
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    margin={"0.5rem 1rem"}
                >
                    <TimeAndLocation />
                </Box>
                <Divider />
                <Box margin={"0.2rem 0rem"}>
                    <ListOfAttendees />
                </Box>
                <Divider />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2">{activity.description}</Typography>
                <Button
                    size="small"
                    onClick={() => router.navigate(NavigateTo.Activity(activity.id))}
                    variant="contained"
                    color="secondary"
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
};

export default ActivityListItem;
