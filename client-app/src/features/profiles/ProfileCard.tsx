import { Profile } from "app/models/profile";
import { NavigateTo } from "app/router/Routes";
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile
}

const ProfileCard = (props: Props) => {
    const { profile } = props;

    const truncate = (str: string | undefined) => {
        return str ? str.length > 40 ? str.substring(0, 37) + '...' : str : '';
    }

    return (
        <Card as={Link} to={NavigateTo.Profile(profile.username)}>
            <Image src={profile.image || 'assets/user.png'} />
            <Card.Content>
                <Card.Header>
                    {profile.displayName}
                </Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" />
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile} />
        </Card>
    )
}

export default observer(ProfileCard);