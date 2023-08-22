import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, Box, Button, Card, CardActions, CardHeader, Divider, Stack, Typography } from "@mui/material";
import { Activity } from "app/models/activity";
import { NavigateTo, router } from "app/router/Routes";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { CardContent } from "semantic-ui-react";

interface Props {
    activity: Activity
}

const ActivityListItem = (props: Props) => {
    const { activity } = props;

    const CancelledHeader = () => {
        return (<CardHeader
            sx={{ backgroundColor: 'firebrick', padding: '0.5rem' }}
            title='Cancelled'
            titleTypographyProps={{ fontSize: 16, fontWeight: 600 }}
        />
        )
    }

    const HostImage = () => {
        return (<Avatar
            alt={activity.host?.displayName}
            src={activity.host?.image || '/assets/user.png'}
            sx={{ width: 80, height: 80, border: '2px solid black' }}
        />)
    }

    const HostOrGoing = (props: { color: string, title: string }) => {
        return (<Typography variant="body2" sx={{
            color: `${props.color}`,
            border: `1px solid ${props.color}`,
            borderRadius: 1,
            padding: '2px 4px'
        }}><strong>{props.title}</strong></Typography>
        )
    }

    const ActivityMainContent = () => {
        return (
            <Box
                display={'flex'}
                flexDirection={'column'}
                margin={'0 2rem'}
                justifyContent={'space-between'}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600 }}
                    color={'primary'}>
                    {activity.title}
                </Typography>
                <Typography>Hosted By <Link to={NavigateTo.Profile(activity.hostUsername)}>{activity.host?.displayName}</Link></Typography>

                {activity.isHost && <HostOrGoing color="maroon" title="You are hosting this activity" />}
                {activity.isGoing && !activity.isHost && <HostOrGoing color="green" title='You are going to this activity' />}
            </Box>)
    }

    const TimeAndLocation = () => {
        return (
            <>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                    <AccessTimeIcon color="primary" />
                    <Typography color={'ButtonText'} gutterBottom marginLeft={'1rem'}>{format(activity.date!, 'dd MMMM yyyy -  h:mm aa')}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <LocationOnIcon />
                    <Typography marginLeft={'1rem'}>{activity.venue}</Typography>
                </Box>
            </>
        )
    }

    const ListOfAttendees = () => {
        return (
            <Stack direction="row">
                {activity.attendees && activity.attendees.map(attendee => (
                    <Button
                        onClick={() => router.navigate(NavigateTo.Profile(attendee.username))}
                        title={`Click to view ${attendee.displayName}'s profile`}
                        startIcon={<Avatar variant='circular' src={attendee.image || '/assets/user.png'} />}
                    >
                    </Button>
                ))}
            </Stack>
        )
    }
    return (
        <Card sx={{ backgroundColor: "rgb(243, 228, 247)", padding: '0rem 1rem', margin: '1rem 0' }}>
            {activity.isCancelled && <CancelledHeader />}
            <CardContent>
                <Box display={'flex'} flexDirection={'row'} margin={'1rem 0rem'} justifyContent={'space-between'}>
                    <Box display={'flex'} flexDirection={'row'}>
                        <HostImage />
                        <ActivityMainContent />
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
                        <TimeAndLocation />
                    </Box>
                </Box>
                <Divider />
                <Box margin={'0.2rem 0rem'}>
                    <ListOfAttendees />
                </Box>
                <Divider />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">{activity.description}</Typography>
                <Button
                    size="small"
                    onClick={() => router.navigate(NavigateTo.Activity(activity.id))}
                    variant="contained"
                    color="secondary"
                >View</Button>
            </CardActions>
        </Card>
    )

}

// const ActivityListItem = (props: Props) => {
//     const { activity } = props;

//     return (
//         <>
//             <Segment.Group>
//                 <Segment>
//                     {activity.isCancelled &&
//                         <Label attached="top" color="red" content='Cancelled' style={{ textAlign: 'center' }} />
//                     }
//                     <Item.Group>
//                         <Item>
//                             <Item.Image style={{ marginBottom: 3 }} size="tiny" circular src={activity.host?.image || '/assets/user.png'} />
//                             <Item.Content>
//                                 <Item.Header as={Link} to={NavigateTo.Activity(activity.id)}>
//                                     {activity.title}
//                                 </Item.Header>
//                                 <Item.Description>Hosted by <Link to={NavigateTo.Profile(activity.hostUsername)}>{activity.host?.displayName}</Link></Item.Description>
//                                 {activity.isHost && (
//                                     <Item.Description>
//                                         <Label basic color="orange">
//                                             You are hosting this activity
//                                         </Label>
//                                     </Item.Description>
//                                 )}
//                                 {activity.isGoing && !activity.isHost && (
//                                     <Item.Description>
//                                         <Label basic color="green">
//                                             You are going this activity
//                                         </Label>
//                                     </Item.Description>
//                                 )}
//                             </Item.Content>
//                         </Item>
//                     </Item.Group>
//                 </Segment>
//                 <Segment>
//                     <span>
//                         <Icon name="clock" /> {format(activity.date!, 'dd MM yyyy h:mm aa')}
//                         <Icon name="marker" /> {activity.venue}
//                     </span>
//                 </Segment>
//                 <Segment secondary>
//                     <ActivityListItemAttendee attendees={activity.attendees!} />
//                 </Segment>
//                 <Segment clearing>
//                     <span>{activity.description}</span>
//                     {/* <Button
//                         as={Link}
//                         to={NavigateTo.Activity(activity.id)}
//                         color="teal"
//                         floated="right"
//                         content="View"
//                     /> */}
//                 </Segment>
//             </Segment.Group>
//             {/* <MUIListItem activity={activity} /> */}
//         </>
//     )
// }

export default ActivityListItem;