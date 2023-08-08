import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string
    name: string
    label?: string
}

const MyTextInput = (props: Props) => {
    const { placeholder, name, label } = props;
    const [field, meta] = useField(name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}></input>
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}

export default MyTextInput;