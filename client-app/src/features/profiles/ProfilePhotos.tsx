import PhotoUploadWidget from "app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "app/models/profile";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

interface Props {
    profile: Profile
}

const ProfilePhotos = (props: Props) => {
    const { profile } = props;
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    const handleSetMainPhoto = (photo: Photo, e: any) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    const handleDeletePhoto = (photo: Photo, e: any) => {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='image' content='Photos' floated="left" />
                    {isCurrentUser &&
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    }

                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ?
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} /> : (
                            <Card.Group itemsPerRow={5}>
                                {profile.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    basic
                                                    color="green"
                                                    content='Main'
                                                    name={'main' + photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === 'main' + photo.id && loading}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                />
                                                <Button
                                                    basic
                                                    color="red"
                                                    icon='trash'
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.id && loading}
                                                    onClick={e => handleDeletePhoto(photo, e)}
                                                />
                                            </Button.Group>
                                        )}
                                    </Card>
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos);