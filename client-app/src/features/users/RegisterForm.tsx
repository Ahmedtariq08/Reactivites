import { LoadingButton } from "@mui/lab";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { useStore } from "app/stores/store";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    displayName: Yup.string().required(),
    username: Yup.string().required(),
});

const RegisterForm = () => {
    const { userStore } = useStore();

    const formik = useFormik({
        initialValues: { email: '', password: '', displayName: '', username: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => userStore.register(values)
            .catch((error) => {
                const errorMessage = error.response.data;
                console.log(errorMessage)
                if (Array.isArray(errorMessage)) {
                    toast.error(errorMessage[0]);
                } else {
                    toast.error(errorMessage);
                }
            })
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Typography
                    variant="h4"
                    color='secondary'
                    fontWeight={600}
                    margin={'1rem 0'}> Sign up for Reactivities </Typography>
                <TextField
                    fullWidth={true}
                    margin="normal"
                    id="displayName"
                    name="displayName"
                    label="Display Name"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName}
                />
                <TextField
                    fullWidth={true}
                    margin="normal"
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth={true}
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth={true}
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <LoadingButton
                    color="secondary"
                    variant="contained"
                    sx={{
                        float: 'right',
                        marginTop: '1rem'
                    }}
                    loading={formik.isSubmitting}
                    loadingIndicator={<CircularProgress color="secondary" size={16} />}
                    disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                    type="submit">
                    Register
                </LoadingButton>
            </form>
        </div>
    )
}

export default observer(RegisterForm);