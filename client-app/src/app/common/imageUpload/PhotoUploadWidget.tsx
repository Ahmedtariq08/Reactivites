import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
    loading: boolean,
    uploadPhoto: (file: Blob) => void
}

const PhotoUploadWidget = (props: Props) => {
    const { loading, uploadPhoto } = props;
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    useEffect(() => {
        return () => {
            files.forEach((file: any) => {
                URL.revokeObjectURL(file.preview);
            });
        }
    }, [files]);

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color="teal" content='Step 1 - Add photo' sub />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color="teal" content='Step 2 - resize image' sub />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header color="teal" content='Step 3 - Preview and upload' sub />
                {files && files.length > 0 && <>
                    <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }}></div>
                    <Button.Group widths={2}>
                        <Button loading={loading} onClick={onCrop} positive icon='check' />
                        <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                    </Button.Group>
                </>}
            </Grid.Column>
        </Grid>
    )
}

export default PhotoUploadWidget;