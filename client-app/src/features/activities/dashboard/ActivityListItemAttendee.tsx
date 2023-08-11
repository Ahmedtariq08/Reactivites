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
    const styles = {
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <>
                    <Popup
                        hoverable
                        key={attendee.username}
                        trigger={
                            <List.Item as={Link} to={NavigateTo.Profile(attendee.username)}>
                                <Image
                                    size="mini"
                                    circular
                                    bordered
                                    src={attendee.image || '/assets/user.png'}
                                    style={attendee.following ? styles : null}
                                />
                            </List.Item>}
                    >
                        <Popup.Content>
                            <ProfileCard profile={attendee} />
                        </Popup.Content>
                    </Popup>
                </>
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendee);