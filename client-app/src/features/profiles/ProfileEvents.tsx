import { EventPredicate } from "app/models/event";
import { NavigateTo } from "app/router/Routes";
import { useStore } from "app/stores/store";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Image, Menu, Placeholder, Segment, Tab } from "semantic-ui-react";

const ActiveTabs: { predicate: EventPredicate, title: string }[] = [
    { predicate: EventPredicate.FUTURE, title: 'Future Events' },
    { predicate: EventPredicate.PAST, title: 'Past Events' },
    { predicate: EventPredicate.HOSTING, title: 'Hosting' },
]

const ProfileEvents = () => {
    const { profileStore: { loadingEvents, loadUserActivities, userActivities } } = useStore();
    const [activeTab, setActiveTab] = useState<EventPredicate>(EventPredicate.FUTURE);

    useEffect(() => {
        if (activeTab) {
            loadUserActivities(activeTab);
        }
    }, [activeTab, loadUserActivities]);

    const dateFormat = (date: string, type: "month" | "hour") => {
        let result = '';
        try {
            let parseFormat = type === "month" ? 'do MMM' : 'h:mm a';
            result = format(parseISO(date), parseFormat)
        } catch (error) {
            console.log(`Error in parsing date ${date}`);
        }
        return result;
    }


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='calendar' content={`Activities`} floated="left" />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Menu pointing secondary>
                        {ActiveTabs.map(tab => (
                            <Menu.Item
                                content={tab.title}
                                active={activeTab === tab.predicate}
                                onClick={() => setActiveTab(tab.predicate)}
                            />
                        ))}
                    </Menu>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {loadingEvents ?
                            <>
                                <EventCardPlaceHolder />
                                <EventCardPlaceHolder />
                            </> :
                            <>
                                {userActivities.map(activity => (
                                    <Card as={Link} to={NavigateTo.Activity(activity.id)} key={activity.id}>
                                        <Image src={`/assets/categoryImages/${activity.category.toLowerCase()}.jpg`} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header textAlign="center">{activity.title}</Card.Header>
                                            <Card.Meta textAlign="center">
                                                <span className='date'>{dateFormat(activity.date, "month")}</span>
                                            </Card.Meta>
                                            <Card.Meta textAlign="center">
                                                <span className='date'>{dateFormat(activity.date, "hour")}</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </>
                        }
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane >
    )
}

const EventCardPlaceHolder = () => {
    return (
        <Card>
            <Placeholder style={{ width: 190 }}>
                <Segment.Group>
                    <Segment style={{ height: 100 }}>
                        <Placeholder>
                            <Placeholder.Image square />
                        </Placeholder>
                    </Segment>
                    <Segment>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='medium' />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Card>
    )
}

export default observer(ProfileEvents);