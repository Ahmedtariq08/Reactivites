import MyTextArea from 'app/common/form/MyTextArea';
import MyTextInput from 'app/common/form/MyTextInput';
import { Profile } from "app/models/profile";
import { useStore } from 'app/stores/store';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import * as Yup from 'yup';

interface Props {
    profile: Profile
}

interface AboutFormValues {
    displayName: string,
    bio: string | undefined
}

const ProfileAbout = (props: Props) => {
    const { profile } = props;
    const { profileStore: { isCurrentUser, loading, updateProfile } } = useStore();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const handleFormSubmit = (values: AboutFormValues) => {
        updateProfile(values.displayName, values.bio);
    }

    const intialFormValues: AboutFormValues = { displayName: profile.displayName, bio: profile.bio || '' };

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        bio: Yup.string()
    });

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='user' content={`About ${profile.displayName}`} floated="left" />
                    {isCurrentUser && <Button
                        basic
                        content={isEditMode ? 'Cancel' : 'Edit Profile'}
                        floated="right"
                        onClick={() => setIsEditMode(!isEditMode)}
                    />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {isEditMode ? (
                        <Formik
                            validationSchema={validationSchema}
                            enableReinitialize
                            initialValues={intialFormValues}
                            onSubmit={values => handleFormSubmit(values)}>
                            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                    <MyTextInput name='displayName' placeholder='Display Name' />
                                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                                    <Button
                                        loading={loading}
                                        floated='right'
                                        positive
                                        type='submit'
                                        content='Update Profile'
                                        disabled={!dirty || !isValid}
                                    />
                                </Form>
                            )}
                        </Formik>
                    ) : <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}


export default observer(ProfileAbout);