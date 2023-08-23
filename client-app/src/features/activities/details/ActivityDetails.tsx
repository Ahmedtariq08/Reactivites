import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";
import { useStore } from "app/stores/store";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";
import { Grid } from "@mui/material";


const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
        return () => {
            clearSelectedActivity();
        }
    }, [id, loadActivity, clearSelectedActivity]);

    if (loadingInitial || !activity) {
        return <LoadingComponent />;
    }

    return (
        <Grid container spacing={2} margin={'2rem'}>
            <Grid item xs={7}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat activityId={activity.id} />
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={3}>
                <ActivityDetailsSideBar activity={activity} />
            </Grid>
        </Grid>
    )

}

export default observer(ActivityDetails);