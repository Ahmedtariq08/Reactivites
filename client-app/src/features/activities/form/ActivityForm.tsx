import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { v4 as uuid } from 'uuid';

const ActivityForm = () => {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading,
        loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required("The activity desciption is required"),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    const handleFormSubmit = async (activity: Activity) => {
        if (!activity.id) {
            activity.id = uuid();
            await createActivity(activity);
            navigate(`/activities/${activity.id}`);
        } else {
            await updateActivity(activity);
        }
    }

    if (loadingInitial) {
        return <LoadingComponent content='Loading activity ...' />
    }

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                            disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
}

export default observer(ActivityForm);