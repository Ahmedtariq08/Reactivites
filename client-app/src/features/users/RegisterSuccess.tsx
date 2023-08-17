import agent from "app/api/agent";
import useQuery from "app/util/hooks";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const RegisterSuccess = () => {
    const email = useQuery().get('email') as string;

    const handleConfirmEmailResend = () => {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success("Verification email resent. Please check your email")
        }).catch(error => console.log(error));
    }

    return (
        <Segment placeholder textAlign="center">
            <Header icon color="green">
                <Icon name="check" />
                Successfully registered!
            </Header>
            <p>Please check your email (including junk email) for the verification email</p>
            {email &&
                <>
                    <p>Didn't receive the email? Click below to resend</p>
                    <Button
                        primary
                        onClick={handleConfirmEmailResend}
                        content='Resent Email'
                        size="huge"
                    />
                </>
            }
        </Segment>
    )

}

export default RegisterSuccess;