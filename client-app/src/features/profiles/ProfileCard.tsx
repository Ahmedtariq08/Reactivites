import { Profile } from "app/models/profile";
import { NavigateTo } from "app/router/Routes";
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

interface Props {
    profile: Profile
}

const ProfileCard = (props: Props) => {
    const { profile } = props;
    return (
        <Card as={Link} to={NavigateTo.Profile(profile.username)}>
            <Image src={profile.image || 'assets/user.png'} />
            <Card.Content>
                <Card.Header>
                    {profile.displayName}
                </Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" />
                20 followers
            </Card.Content>
        </Card>
    )
}

export default observer(ProfileCard);