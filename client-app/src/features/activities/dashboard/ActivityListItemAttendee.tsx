import { Profile } from "app/models/profile";
import { NavigateTo } from "app/router/Routes";
import ProfileCard from "features/profiles/ProfileCard";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";

interface Props {
    attendees: Profile[]
}
const ActivityListItemAttendee = (props: Props) => {
    const { attendees } = props;

    const ProfilePopup = (props: { attendee: Profile }) => {
        const { attendee } = props;
        return (
            <>
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item as={Link} to={NavigateTo.Profile(attendee.username)}>
                            <Image size="mini" circular src={attendee.image || '/assets/user.png'} />
                        </List.Item>}
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            </>
        )
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <ProfilePopup attendee={attendee} />
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendee);