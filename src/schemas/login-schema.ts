import * as yup from 'yup';

const loginSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(8, 'Username must be at least 8 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
});

export { loginSchema };