import { APIs } from "../api/apis";
import { Activity } from "../interfaces/Activity";

const ActivityAPIs = APIs.ACTIVITIES;

export class ActivityService {

    public static getActivities = async (): Promise<Activity[]> => {
        const response = await ActivityAPIs.getActivities();
        return response.data as Activity[];
    }
}