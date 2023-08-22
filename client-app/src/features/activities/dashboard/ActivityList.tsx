import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Grid, Typography } from "@mui/material";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupActivities } = activityStore;

    const DateHeader = (props: { group: string }) => {
        return (
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} marginTop={'2rem'}>
                <KeyboardDoubleArrowRightIcon fontSize="large" />
                <Typography variant="h6" sx={{ fontSize: 18 }} color={'secondary.light'}>{props.group}</Typography>
            </Box>
        )
    }

    return (
        <>
            {groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <DateHeader group={group} />
                    <Grid container spacing={2}>
                        {activities.map(activity => (
                            <Grid item xs={6}>
                                <ActivityListItem key={activity.id} activity={activity} />
                            </Grid>

                        ))}
                    </Grid>
                    {/* {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))} */}
                </Fragment>
            ))}
        </>


    )

}

export default observer(ActivityList);