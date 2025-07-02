'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/login-schema';
import axiosInstance from '@/lib/axios-instance';
import { Button, TextField, Typography, Stack, Box } from '@mui/material';
import { useSnackbarStore } from '@/stores/snackbar-store';

const LoginForm: React.FC = () => {
    const { showSnackbar } = useSnackbarStore();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const setAuhorizationCookie = () => {
        document.cookie = 'is-authorized=true; path=/; max-age=86400';
    };

    const login = async (data: { username: string; password: string }) => {
        const { username, password } = data;

        try {
            setIsLoading(true);

            const response = await axiosInstance.post('/auth/login', {
                username,
                password
            });

            if (response.status === 200) {
                setAuhorizationCookie();
                router.push('/');
                showSnackbar('Login successful', 'success');
            }
        } catch (error) {
            showSnackbar('Invalid credentials', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ width: '75%' }}>
            <form onSubmit={handleSubmit(login)}>
                <Stack direction="column" spacing={3}>
                    <Stack direction="column" spacing={1}>
                        <Typography
                            variant="h4"
                            textAlign={{ xs: 'center', md: 'left' }}
                        >
                            Welcome to Zelora
                        </Typography>
                        <Typography
                            variant="body1"
                            textAlign={{ xs: 'center', md: 'left' }}
                        >
                            Login to access admin dashboard
                        </Typography>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        loading={isLoading}
                        loadingPosition="start"
                        sx={{
                            backgroundColor: 'black'
                        }}
                    >
                        {!isLoading ? 'Login' : 'Logging in...'}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginForm;