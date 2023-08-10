import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string,
    setCropper: (cropper: Cropper) => void
}

const PhotoWidgetCropper = (props: Props) => {
    const { imagePreview, setCropper } = props;
    return (
        <Cropper
            src={imagePreview}
            style={{ height: 200, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            prefix=".img-preview"
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}

export default PhotoWidgetCropper;