import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
    const { activityStore: { predicate, setPredicate } } = useStore();

    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: '27px' }}>
                <Header icon={'filter'} attached color="teal" content='Filters' />
                <Menu.Item
                    content='All Activities'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item
                    content="I'm going"
                    active={predicate.has('IsGoing')}
                    onClick={() => setPredicate('IsGoing', 'true')}
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('IsHost')}
                    onClick={() => setPredicate('IsHost', 'true')}
                />
            </Menu>
            <Header />
            <Calendar
                onChange={(date: any) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>


    )

}

export default observer(ActivityFilters);