import { LoadingButton } from '@mui/lab';
import { CircularProgress, TextField, Typography } from "@mui/material";
import { useStore } from "app/stores/store";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import * as yup from 'yup';


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginForm = () => {
    const { userStore } = useStore();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            error: null
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setErrors }) => userStore.login(values)
            .catch((error) => {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
                // setErrors({ error: errorMessage });
            })
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Typography
                    variant="h4"
                    color='primary'
                    fontWeight={600}
                    margin={'1rem 0'}> Login to Reactivities </Typography>
                <TextField
                    fullWidth
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
                    fullWidth
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
                    color="primary"
                    variant="contained"
                    sx={{
                        float: 'right',
                        marginTop: '1rem'
                    }}
                    loading={formik.isSubmitting}
                    loadingIndicator={<CircularProgress color="primary" size={16} />}
                    type="submit">
                    Submit
                </LoadingButton>
            </form>
        </div>
    )
}

export default observer(LoginForm);