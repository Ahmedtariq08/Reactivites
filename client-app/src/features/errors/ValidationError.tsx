import { Message } from "semantic-ui-react";

interface Props {
    errors: any
}

export const ValidationError = (props: Props) => {
    const { errors } = props;
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i: any) => (
                        <Message.Item key={i}>
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}