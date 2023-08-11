import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useStore } from "app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "app/layout/LoadingComponent";

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, profile, setActiveTab, clearEventsRegistry } = profileStore;

    useEffect(() => {
        if (username) {
            loadProfile(username);
        }
        return () => {
            setActiveTab(0);
            clearEventsRegistry();
        }
    }, [loadProfile, username, setActiveTab, clearEventsRegistry]);

    if (loadingProfile) {
        return <LoadingComponent content="Loading profile ..." />;
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage);