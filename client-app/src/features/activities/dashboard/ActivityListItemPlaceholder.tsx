import { Box, Skeleton, Stack } from "@mui/material";
import { Fragment } from "react";

export default function ActivityListItemPlaceholder() {
    const constantSx = {
        bgcolor: "rgb(255, 230, 255, 0.4)", // light purple
    };

    const SkeletonCard = () => {
        return (
            <Stack spacing={1}>
                <Stack spacing={1} direction={"row"}>
                    <Skeleton variant="circular" width={80} height={80} sx={constantSx} />
                    <Stack spacing={1}>
                        <Skeleton variant="text" sx={{ ...constantSx, fontSize: "1rem" }} width={200} />
                        <Skeleton variant="text" sx={{ ...constantSx, fontSize: "1rem" }} width={200} />
                        <Skeleton variant="text" sx={{ ...constantSx, fontSize: "0.5rem" }} />
                    </Stack>
                </Stack>
                <Skeleton variant="rounded" width={480} height={40} sx={constantSx} />
                <Skeleton variant="rounded" width={480} height={60} sx={constantSx} />
            </Stack>
        );
    };
    return (
        <Fragment>
            <Box margin={"2rem 0"}>
                <Skeleton
                    variant="rounded"
                    width={280}
                    height={30}
                    sx={{ ...constantSx, margin: "2rem 0" }}
                />
                <Stack spacing={2} direction={"row"}>
                    <SkeletonCard />
                </Stack>
                <Skeleton
                    variant="rounded"
                    width={280}
                    height={30}
                    sx={{ ...constantSx, margin: "4rem 0 2rem 0" }}
                />
                <Stack spacing={2} direction={"row"}>
                    <SkeletonCard />
                    <SkeletonCard />
                </Stack>
            </Box>
        </Fragment>
    );
}
