import { Message } from "semantic-ui-react";

interface Props {
    errors: string[]
}

export const ValidationError = (props: Props) => {
    const { errors } = props;
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, i) => (
                        <Message.Item key={i}>
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}