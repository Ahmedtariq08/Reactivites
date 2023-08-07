import { Grid } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean,
    openForm: (id: string) => void;
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
    submitting: boolean
}

const ActivityDashboard = (props: Props) => {
    const { activities, selectActivity, cancelSelectActivity,
        selectedActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting } = props;
    return (
        <Grid>
            <Grid.Column width={'10'}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width={'6'}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode && <ActivityForm
                    closeForm={closeForm}
                    activity={selectedActivity}
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}

            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;