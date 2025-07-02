'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import LoginForm from '@/components/login/LoginForm';

const Login: NextPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const authorized = document.cookie.includes('is-authorized=true');

        if (authorized) {
            router.push('/');
        } else {
            setIsAuthorized(false);
        }
    }, [router]);

    return (
        !isAuthorized && (
            <Stack direction={{ xs: 'column', md: 'row' }}>
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        height: { xs: '25vh', md: '100vh' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ShoppingBag sx={{ fontSize: 324 }} />
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        height: { xs: '75vh', md: '100vh' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <LoginForm />
                </Box>
            </Stack>
        )
    );
};

export default Login;