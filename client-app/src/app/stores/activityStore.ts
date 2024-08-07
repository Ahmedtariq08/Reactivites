import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "app/models/profile";
import { Pagination, PagingParams } from "app/models/pagination";

export enum Predicate {
    IsHost = "IsHost",
    IsGoing = "IsGoing",
    All = "all",
    StartDate = "startDate",
}

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set(Predicate.All, true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.activityRegistry.clear();
                this.loadActivities();
            },
        );
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    setPredicate = (predicate: Predicate, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if (key !== Predicate.StartDate) {
                    this.predicate.delete(key);
                }
            });
        };

        switch (predicate) {
            case Predicate.All:
                resetPredicate();
                this.predicate.set(Predicate.All, true);
                break;
            case Predicate.IsGoing:
                resetPredicate();
                this.predicate.set(Predicate.IsGoing, true);
                break;
            case Predicate.IsHost:
                resetPredicate();
                this.predicate.set(Predicate.IsHost, true);
                break;
            case Predicate.StartDate:
                this.predicate.delete(Predicate.StartDate);
                this.predicate.set(Predicate.StartDate, value);
                break;
        }
    };

    get axiosParams() {
        const params = new URLSearchParams();
        params.append("pageNumber", this.pagingParams.pageNumber.toString());
        params.append("pageSize", this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if (key === Predicate.StartDate) {
                params.append(key, (value as Date).toISOString());
            } else {
                params.append(key, value);
            }
        });
        return params;
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => a.date!.getTime() - b.date!.getTime(),
        );
    }

    get groupActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, "dd MMM yyyy");
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] }),
        );
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                return activity;
            } catch (error) {
                console.log(error);
            } finally {
                this.setLoadingInitial(false);
            }
        }
    };

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    };

    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some((attendee) => attendee.username === user.username);
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(
                (attendee) => attendee.username === activity.hostUsername,
            );
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    };

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Activities.list(this.axiosParams);
            result.data.forEach((activity) => {
                this.setActivity(activity);
            });
            this.setPagination(result.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);

        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            let newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            });
        } catch (error) {
            console.log(error);
        }
    };

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = { ...this.getActivity(activity.id), ...activity };
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(
                        (attendee) => attendee.username !== user?.username,
                    );
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    };

    updateAttendeeFollowing = (username: string) => {
        this.activityRegistry.forEach((activity) => {
            activity.attendees.forEach((attendee) => {
                if (attendee.username === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            });
        });
    };
}
