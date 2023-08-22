import { PagingParams } from "app/models/pagination";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import { Container, Grid } from "@mui/material";

const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState<boolean>();

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [loadActivities, activityRegistry.size]);

    return (
        <Container sx={{ overflow: 'atuo', }}>
            <Grid container direction={'row'} spacing={4}>
                <Grid item xs={8}>
                    {activityStore.loadingInitial && !loadingNext ? (
                        <>
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />
                        </>
                    ) : (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                        >
                            <ActivityList />
                        </InfiniteScroll>
                    )}
                </Grid>
                <Grid item xs={4}>
                    <ActivityFilters />
                </Grid>
                <Grid item xs={10}>
                    {/* <Loader active={loadingNext} /> */}
                </Grid>
            </Grid>
        </Container>
    )
}

export default observer(ActivityDashboard);