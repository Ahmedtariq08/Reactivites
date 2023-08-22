import { Stack, Avatar, Popover, Typography, Button } from "@mui/material";
import { Profile } from "app/models/profile";
import { NavigateTo } from "app/router/Routes";
import { id } from "date-fns/locale";
import ProfileCard from "features/profiles/ProfileCard";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";

const styles = {
    borderColor: 'orange',
    borderWidth: 3
}

interface Props {
    attendees: Profile[]
}

const ActivityListItemAttendee = (props: Props) => {
    const { attendees } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Stack direction="row">
            {attendees.map(attendee => (
                <>
                    <Button
                        onClick={handleClick}
                        title={`Click to view ${attendee.displayName}'s profile`}
                        startIcon={<Avatar variant='circular' src={attendee.image || '/assets/user.png'} />}
                    >
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <ProfileCard profile={attendee} />
                    </Popover>
                </>

            ))}
        </Stack>
    )

    // return (
    //     <List horizontal>
    //         {attendees.map(attendee => (
    //             <>
    //                 <Popup
    //                     hoverable
    //                     key={attendee.username}
    //                     trigger={
    //                         <List.Item as={Link} to={NavigateTo.Profile(attendee.username)}>
    //                             <Image
    //                                 size="mini"
    //                                 circular
    //                                 bordered
    //                                 src={attendee.image || '/assets/user.png'}
    //                                 style={attendee.following ? styles : null}
    //                             />
    //                         </List.Item>}
    //                 >
    //                     <Popup.Content>
    //                         <ProfileCard profile={attendee} />
    //                     </Popup.Content>
    //                 </Popup>
    //             </>
    //         ))}
    //     </List>
    // )
}

export default observer(ActivityListItemAttendee);