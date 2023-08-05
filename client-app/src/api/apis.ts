import { get, post, put, destroy } from "./axiosClient";

export const APIs = {
    ACTIVITIES: {
        getActivities: () => get('/api/activities'),

    }
}