import { Grid } from "semantic-ui-react";
import ActivityListSkeleton from "./ActivityListSkeleton";

const DashboardSkeleton = () => {
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <ActivityListSkeleton />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {/* <ActivityFilters /> */}
            </Grid.Column>
        </Grid>
    )
}

export default DashboardSkeleton;