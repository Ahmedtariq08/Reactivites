import { observer } from "mobx-react-lite";
import { Activity } from "app/models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "app/stores/store";
import { NavigateTo, router } from "app/router/Routes";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
    activity: Activity;
}

export default observer(function DetailsMUI({ activity }: Props) {
    const {
        activityStore: { updateAttendance, loading, cancelActivityToggle },
    } = useStore();

    const ImageHeader = () => {
        return (
            <div style={{ position: "relative" }}>
                <CardMedia
                    sx={{ height: 250, filter: "brightness(30%)" }}
                    image={`/assets/categoryImages/${activity.category}.jpg`}
                    title="green iguana"
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "5%",
                        left: "5%",
                        width: "100%",
                        height: "auto",
                        color: "white",
                    }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        {activity.title}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        {format(activity.date!, "dd MMMM, yyyy - h:mm aa")}
                    </Typography>
                    <Typography variant="h6">
                        Hosted by{" "}
                        <strong>
                            <Link to={NavigateTo.Profile(activity.host?.username!)}>
                                {activity.host?.displayName}
                            </Link>
                        </strong>
                    </Typography>
                </div>
            </div>
        );
    };

    const DetailList = () => {
        return (
            <List style={{ padding: 0 }}>
                <ListItem>
                    <ListItemIcon>
                        <InfoIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={activity.description} sx={{ fontSize: "50px" }} />
                </ListItem>
                <Divider component="li" variant={"inset"} />
                <ListItem>
                    <ListItemIcon>
                        <LocationOnIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary={`${activity.venue}, ${activity.city}`} />
                </ListItem>
                <Divider variant={"inset"} component="li" />
            </List>
        );
    };

    const HostButtons = () => {
        return (
            <>
                <Button
                    onClick={cancelActivityToggle}
                    variant="contained"
                    color={activity.isCancelled ? "success" : "warning"}
                >
                    {loading ? (
                        <CircularProgress size={20} />
                    ) : activity.isCancelled ? (
                        "Reactivate Activity"
                    ) : (
                        "Cancel Activity"
                    )}
                </Button>
                <Button
                    onClick={() => {
                        router.navigate(NavigateTo.ManageActivity(activity.id));
                    }}
                    disabled={activity.isCancelled}
                    variant="contained"
                    color="info"
                    // sx={{ backgroundColor: "grey" }}
                >
                    Manage Event
                </Button>
            </>
        );
    };

    return (
        <Card>
            <ImageHeader />
            <CardContent>
                <DetailList />
            </CardContent>
            <CardActions sx={{ float: "right", padding: "0 1rem 1rem 0" }}>
                {activity.isHost && <HostButtons />}
            </CardActions>
        </Card>
    );
});
