import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Typography } from "@mui/material";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupActivities } = activityStore;

    return (
        <>
            {groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <KeyboardDoubleArrowRightIcon fontSize="large" />
                        <Typography variant="h6" sx={{ fontSize: 18 }} color={'secondary.light'}>{group}</Typography>
                    </Box>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>


    )

}

export default observer(ActivityList);