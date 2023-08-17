import agent from "app/api/agent";
import { useStore } from "app/stores/store";
import useQuery from "app/util/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "./LoginForm";

const Status = {
    Verifying: 'Verifying',
    Failed: 'Failed',
    Success: 'Success'
}

const ConfirmEmail = () => {
    const { modalStore } = useStore();
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    const [status, setStatus] = useState(Status.Verifying);

    const handleConfirmEmailResend = () => {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success("Verification email resent. Please check your email")
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Success);
        }).catch(() => {
            setStatus(Status.Failed)
        });
    }, [token, email]);

    const getBody = () => {
        switch (status) {
            case Status.Verifying:
                return <p>Verifying ...</p>
            case Status.Failed:
                return (
                    <div>
                        <p>Verification Failed. You can try resending the verify link to your email</p>
                        <Button primary onClick={handleConfirmEmailResend} size="huge" content='Resend Email' />
                    </div>
                )
            case Status.Success:
                return (
                    <div>
                        <p>Email has been verified. You can proceed to login</p>
                        <Button primary onClick={() => modalStore.openModal(<LoginForm />)} size="huge" content='Login' />
                    </div>
                )
        }
    }

    return (
        <Segment placeholder textAlign="center">
            <Header icon>
                <Icon name='envelope' />
                Email Verification
            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>
        </Segment>
    )
}

export default ConfirmEmail;