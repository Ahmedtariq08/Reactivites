import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string
}

const LoadingComponent = (props: Props) => {
    const { inverted = true, content = "Loading..." } = props;
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent;