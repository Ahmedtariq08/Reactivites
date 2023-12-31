import agent from "app/api/agent";
import { Photo, Profile } from "app/models/profile";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { store } from "./store";
import { EventPredicate, UserEvent } from "app/models/event";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    loadingFollowings = false;
    followings: Profile[] = [];
    activeTab = 0;
    //for events
    eventsRegistry: Map<EventPredicate, UserEvent[]> = new Map();
    userActivities: UserEvent[] = [];
    loadingEvents = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
            });
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => {
                this.uploading = false;
            })
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            if (this.profile && this.profile.photos) {
                this.profile.photos = this.profile.photos.filter(p => p.id !== photo.id);
                //what to do if photo is main ??
            }
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateProfile = async (displayName: string, bio?: string) => {
        this.loading = true;
        try {
            if (this.isCurrentUser) {
                const updatedProfile = { ...this.profile, displayName: displayName, bio: bio } as Profile;
                await agent.Profiles.updateAbout(updatedProfile);
                runInAction(() => {
                    this.profile = updatedProfile;
                    store.userStore.user!.displayName = updatedProfile.displayName;
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    //following is what we about to change it to
    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.username) {
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    loadFollowings = async (predicate: "followers" | "following") => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile?.username!, predicate);
            runInAction(() => {
                this.followings = followings;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingFollowings = false;
            })
        }
    }

    loadUserActivities = async (predicate: EventPredicate) => {
        this.loadingEvents = true;
        try {
            if (this.eventsRegistry.has(predicate)) {
                this.userActivities = this.eventsRegistry.get(predicate)!;
            } else {
                const activities = await agent.Profiles.listUserActivities(this.profile?.username!, predicate);
                runInAction(() => {
                    this.userActivities = activities;
                    this.eventsRegistry.set(predicate, activities);
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingEvents = false;
            })
        }
    }

    clearEventsRegistry = () => {
        this.eventsRegistry.clear();
    }
}