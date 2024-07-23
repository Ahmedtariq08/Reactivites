import { Box, CircularProgress, Grid } from "@mui/material";
import { PagingParams } from "app/models/pagination";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState<boolean>();

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    };

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [loadActivities, activityRegistry.size]);

    return (
        <Box sx={{ overflow: "atuo", margin: "1rem 7rem 4rem 7rem" }}>
            <Grid container direction={"row"} spacing={5}>
                <Grid item xs={8}>
                    {activityStore.loadingInitial && !loadingNext ? (
                        <ActivityListItemPlaceholder />
                    ) : (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={
                                !loadingNext && !!pagination && pagination.currentPage < pagination.totalPages
                            }
                            initialLoad={false}
                        >
                            <ActivityList />
                        </InfiniteScroll>
                    )}
                </Grid>
                <Grid item xs={3}>
                    <ActivityFilters />
                </Grid>
            </Grid>
            {loadingNext && (
                <Box flexDirection={"row"} display={"flex"} justifyContent={"center"}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default observer(ActivityDashboard);
